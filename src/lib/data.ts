import { XMLParser } from 'fast-xml-parser';
import { unstable_cache } from 'next/cache';

export interface Stock {
	ticker: string;
	name: string;
	lastPrice?: number;
}

export interface NewsArticle {
	title: string;
	link: string;
	pubDate: Date;
	formattedDate: string;
	source: string;
}

export interface DividendInfo {
	ticker: string;
	name: string;
	dividends: { date: string; value: number }[];
}

const urlStocks =
	'https://iss.moex.com/iss/engines/stock/markets/shares/securities.json?tradable=true';

export async function getMoexStocks(): Promise<Stock[]> {
	try {
		const res1 = await fetch(urlStocks, { next: { revalidate: 86400 } });

		if (!res1.ok) {
			throw new Error(`Ошибка при получении списка бумаг - ${res1.statusText}`);
		}

		const securities = await res1.json();

		const columns = securities?.securities?.columns;
		const data = securities?.securities?.data;

		if (!Array.isArray(columns) || !Array.isArray(data)) {
			throw new Error('Неверная структура данных securities');
		}

		const secidIndex = columns.indexOf('SECID');
		const nameIndex = columns.indexOf('SECNAME');

		if (secidIndex === -1 || nameIndex === -1) {
			throw new Error('Не найдены нужные колонки');
		}

		// Удаление дубликатов по SECID (оставляем первую встречающуюся запись)
		const uniqueDataMap = new Map<string, any[]>();
		for (const row of data) {
			const secid = row[secidIndex];
			if (!uniqueDataMap.has(secid)) {
				uniqueDataMap.set(secid, row);
			}
		}
		const uniqueData = Array.from(uniqueDataMap.values());

		const tickers = uniqueData.map((d: any[]) => d[secidIndex]).join(',');

		const res2 = await fetch(
			`https://iss.moex.com/iss/engines/stock/markets/shares/securities.json?securities=${tickers}&iss.only=marketdata`,
			{ next: { revalidate: 1000 } }
		);

		if (!res2.ok) {
			throw new Error(`Ошибка при получении цен - ${res2.statusText}`);
		}

		const market = await res2.json();
		const marketCols = market?.marketdata?.columns;
		const marketData = market?.marketdata?.data;

		if (!Array.isArray(marketCols) || !Array.isArray(marketData)) {
			throw new Error('Неверная структура данных marketdata');
		}

		const priceIndex = marketCols.indexOf('LAST');
		const secidPriceIndex = marketCols.indexOf('SECID');

		if (priceIndex === -1 || secidPriceIndex === -1) {
			throw new Error('Колонки LAST или SECID не найдены в marketdata');
		}

		const priceMap = Object.fromEntries(
			marketData.map((row: any[]) => [row[secidPriceIndex], row[priceIndex]])
		);

		return uniqueData.map((row: any[]) => ({
			ticker: row[secidIndex],
			name: row[nameIndex],
			lastPrice: priceMap[row[secidIndex]] ?? 0,
		}));
	} catch (error: unknown) {
		throw new Error(
			error instanceof Error
				? `Ошибка при получении данных с MOEX: ${error.message}`
				: 'Неизвестная ошибка'
		);
	}
}

const sources = [
	{
		name: 'RBC',
		url: 'https://rssexport.rbc.ru/rbcnews/news/30/full.rss',
	},
	{
		name: 'Lenta',
		url: 'https://lenta.ru/rss',
	},
	{
		name: 'Interfax',
		url: 'https://www.interfax.ru/rss.asp',
	},
];

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '',
});

export async function getNews(): Promise<NewsArticle[]> {
	const allNews: NewsArticle[] = [];

	for (const source of sources) {
		try {
			const res = await fetch(source.url, {
				next: { revalidate: 200 },
			});

			if (!res.ok) {
				throw new Error(`Ошибка загрузки RSS: ${res.statusText}`);
			}

			const xml = await res.text();
			const parsed = parser.parse(xml);
			const items = parsed?.rss?.channel?.item ?? [];

			const filtered = items.filter((item: any) =>
				item.category?.includes('Экономика')
			);

			const formatted = filtered.map((item: any) => {
				const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
				return {
					title: item.title || 'Без названия',
					link: item.link || '#',
					pubDate,
					formattedDate: formatDate(pubDate),
					source: source.name,
				};
			});

			allNews.push(...formatted);
		} catch (err) {
			console.error(`Ошибка при загрузке из ${source.name}:`, err);
		}
	}

	return allNews.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
function formatDate(date: Date): string {
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

/////////////

export const getTickersWithDividends = unstable_cache(async () => {
	const stocks = await getMoexStocks();
	let tickersWithDividends: DividendInfo[] = [];

	const dividendRequests = stocks.map(
		async (stock) => {
			try {
				const res = await fetch(
					`https://iss.moex.com/iss/securities/${stock.ticker}/dividends.json`,
					{ next: { revalidate: 86400 } }
				);
				if (!res.ok) {
					// throw new Error(`Ошибка загрузки дивидендов для ${stock.ticker}`);
					return null;
				}
				const json = await res.json();
				const dividendsData = json?.dividends?.data;
				const columns = json?.dividends?.columns;

				if (!Array.isArray(dividendsData) || dividendsData.length === 0) {
					// throw new Error(`Нет дивидендов для ${stock.ticker}`);
					return null;
				}

				const regDateIdx = columns.indexOf('registryclosedate');
				const valueIdx = columns.indexOf('value');

				if (regDateIdx === -1 || valueIdx === -1) {
					// throw new Error(`Нет нужных колонок в дивидендах ${stock.ticker}`);
					return null;
				}

				const parsedDividends = dividendsData.map((item: any[]) => ({
					date: item[regDateIdx],
					value: item[valueIdx],
				}));

				return {
					ticker: stock.ticker,
					name: stock.name,
					dividends: parsedDividends,
				};
			} catch (err) {
				console.warn(`Ошибка при загрузке дивидендов для ${stock.name}:`, err);
				return null;
			}
		}
	);

	// const results = await Promise.allSettled(dividendRequests);
	// for (const result of results) {
	// 	if (result.status === 'fulfilled') {
	// 		tickersWithDividends.push(result.value);
	// 	} else {
	// 		console.warn('Ошибка при получении данных:', result.reason);
	// 	}
	// }

	const results = await Promise.all(dividendRequests);
	tickersWithDividends = results.filter(
		(it): it is DividendInfo => it !== null
	);
	// console.log(tickersWithDividends);
	return tickersWithDividends;
},
['tickers-with-dividends'],
{
	tags: ['tickers-with-dividends'],
	revalidate: 86400
}
);

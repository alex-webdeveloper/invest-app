import { getTickersWithDividends } from "@/lib/data";
import { getFilteredItems } from "@/lib/utils";
import Pagination from "@/ui/pagination";
import type { DividendInfo } from "@/lib/data";

export default async function AnalyticsTable({ currentPage }: {
  currentPage: number;
}) {
  const dividendTickers = await getTickersWithDividends();
  const { itemsPerPage, totalPages } = getFilteredItems<DividendInfo>(dividendTickers, currentPage, null, 5);

  return (
    <div className="w-full">
      {/* Для больших экранов: таблица */}
      <div className="hidden sm:block">
        <table className="w-full rounded-lg border border-foreground">
          <thead className="text-foreground text-sm uppercase border-b border-foreground">
            <tr className="bg-stone-500">
              <th className="px-4 py-3 text-left">Тикер</th>
              <th className="px-4 py-3 text-left">Название</th>
              <th className="px-4 py-3 text-left">Дивиденды</th>
            </tr>
          </thead>
          <tbody>
            {itemsPerPage.map((stock, i) => (
              <tr
                key={stock.ticker + i}
                className="hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <td className="px-4 py-3 text-foreground">
                  🇷🇺 {stock.ticker}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {stock.name}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {stock.dividends.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {stock.dividends.map((dividend, idx) => (
                        <li key={dividend.date + idx}>
                          📅 {dividend.date}: 💰 {dividend.value} ₽
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Нет данных</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Для мобильных экранов: карточки */}
      <div className="sm:hidden space-y-4">
        {itemsPerPage.map((stock, i) => (
          <div
            key={stock.ticker + i}
            className="rounded-lg border border-foreground p-4 bg-[#ffffff0a] text-foreground"
          >
            <div className="font-semibold text-sm mb-2">
              🇷🇺 {stock.ticker}
            </div>
            <div className="text-sm">
              {stock.dividends.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {stock.dividends.map((dividend, idx) => (
                    <li key={dividend.date + idx}>
                      📅 {dividend.date}: 💰 {dividend.value} ₽
                    </li>
                  ))}
                </ul>
              ) : (
                <span>Нет данных</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Пагинация */}
      <div className="mt-6 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
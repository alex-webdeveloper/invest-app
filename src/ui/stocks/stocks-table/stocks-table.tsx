import { getFilteredItems } from "@/lib/utils";
import Pagination from "@/ui/pagination";
import { getMoexStocks } from "@/lib/data";
import type { Stock } from "@/lib/data";

export default async function StocksTable({ query, currentPage }: {
  query: string;
  currentPage: number;
}) {
  const stocks = await getMoexStocks();
  const { itemsPerPage, totalPages } = getFilteredItems<Stock>(stocks, currentPage, query);

  return (
    <div className="w-full">
      {/* Для больших экранов: обычная таблица */}
      <div className="hidden sm:block">
        <table className="w-full rounded-lg border border-foreground">
          <thead className="text-foreground text-sm uppercase border-b border-foreground">
            <tr className="bg-stone-500">
              <th className="px-4 py-3 text-left">Тикер</th>
              <th className="px-4 py-3 text-left">Название</th>
              <th className="px-4 py-3 text-left">Цена</th>
            </tr>
          </thead>
          <tbody>
            {itemsPerPage.map((stock, i) => (
              <tr
                key={stock.ticker + i}
                className="hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <td className="px-4 py-3 font-mono text-foreground">
                  🇷🇺 {stock.ticker}
                </td>
                <td className="px-4 py-3 text-foreground">📄 {stock.name}</td>
                <td className="px-4 py-3 text-foreground">
                  💰 {stock.lastPrice?.toFixed(2)} ₽
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
            <div className="font-semibold font-mono text-sm mb-2">🇷🇺 {stock.ticker}</div>
            <div className="text-sm">📄 {stock.name}</div>
            <div className="text-sm mt-1">💰 {stock.lastPrice?.toFixed(2)} ₽</div>
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

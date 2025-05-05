import { countElements } from "@/lib/utils";

export default function AnalyticsTableSkeleton() {
  const rows = Array.from({ length: countElements }); // Можно поменять количество строк

  return (
    <div className="w-full">
      {/* Скелетон для таблицы на больших экранах */}
      <div className="hidden sm:block animate-pulse">
        <table className="w-full rounded-lg border border-foreground">
          <thead className="text-foreground text-sm uppercase border-b border-foreground">
            <tr className="bg-stone-500">
              <th className="px-4 py-3 text-left">Тикер</th>
              <th className="px-4 py-3 text-left">Дивиденды</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-500/30 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-40 bg-gray-500/30 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-500/30 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Скелетон для карточек на мобилках */}
      <div className="sm:hidden space-y-4 animate-pulse">
        {rows.map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-foreground p-4 bg-[#ffffff0a]"
          >
            <div className="h-4 w-24 bg-gray-500/30 rounded mb-3" />
            <div className="h-4 w-40 bg-gray-500/30 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-500/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

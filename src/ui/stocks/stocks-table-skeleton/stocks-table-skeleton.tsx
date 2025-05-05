import { countElements } from "@/lib/utils";

export default function StocksTableSkeleton() {
  const rows = Array.from({ length: countElements });

  return (
    <div className="animate-pulse overflow-x-auto">
      <div className="min-w-full rounded-lg overflow-hidden border border-foreground">
        <table className="min-w-full">
          <thead className="text-foreground text-sm uppercase border-b border-foreground">
            <tr className="bg-[#ffffff17]">
              <th className="px-6 py-3 text-left">Тикер</th>
              <th className="px-6 py-3 text-left">Название</th>
              <th className="px-6 py-3 text-left">Цена</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-500/30 rounded w-16" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-500/30 rounded w-40" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-500/30 rounded w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

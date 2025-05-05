import { countElements } from "@/lib/utils";

export default function NewsBlockSkeleton() {
  const rows = Array.from({ length: countElements }); // Количество элементов-скелетов (можно настроить)

  return (
    <div className="space-y-6 animate-pulse">
      {rows.map((_, index) => (
        <section
          key={index}
          className="bg-background text-foreground rounded-lg border border-foreground p-5 shadow-sm animate-pulse"
        >
          <div className="h-6 bg-gray-500/30 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-500/30 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-500/30 rounded w-full" />
        </section>
      ))}
    </div>
  );
}

import SearchStock from "@/ui/stocks/search-stock";
import StocksTable from "@/ui/stocks/stocks-table";
import StocksTableSkeleton from "@/ui/stocks/stocks-table-skeleton";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="py-10 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-center mb-6 text-2xl sm:text-3xl font-semibold text-foreground">
          Котировки акций
        </h1>
        <SearchStock placeholder="Введите название или тикер"/>
        <Suspense fallback={<StocksTableSkeleton/>}>
          <StocksTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </section>
  );
}

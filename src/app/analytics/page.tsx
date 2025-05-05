import { Suspense } from "react";
import AnalyticsTableSkeleton from "@/ui/analytics/analytics-table-skeleton";
import AnalyticsTable from "@/ui/analytics/analytics-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аналитика",
  description: "Вся информация предоставленна Московской биржей (MOEX ISS API) в режиме реального времени: девиденты акций ведущих компаний.",
};

export default async function AnalyticsPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="py-10 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-center mb-6 text-2xl sm:text-3xl font-semibold text-foreground">
          Акции с дивидендами</h1>
        <Suspense fallback={<AnalyticsTableSkeleton />}>
          <AnalyticsTable currentPage={currentPage} />
        </Suspense>
      </div>
    </section>
  );
}

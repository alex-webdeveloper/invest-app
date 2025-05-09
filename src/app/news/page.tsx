// app/news/page.tsx (или components/NewsFeed.tsx если выносишь отдельно)
import BlockNews from '@/ui/news/news-block';
import { Suspense } from 'react';
import BlockNewsSkeleton from '@/ui/news/news-block-skeleton';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get('host') || '';
  const isProduction = host === 'www.invest-ru.ru';

  return {
    title: "Новости экономики",
    description: "Вся информация предоставлена RBC, Lenta, и Interfax в режиме реального времени: новости экономики.",
    alternates: {
      canonical: isProduction ? 'https://www.invest-ru.ru/news' : undefined,
    },
  };
}

export default async function News(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="py-10 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-center mb-6 text-2xl sm:text-3xl font-semibold text-foreground">Новости экономики</h1>
        <Suspense fallback={<BlockNewsSkeleton />}>
          <BlockNews currentPage={currentPage} />
        </Suspense>
      </div>
    </section >
  )
}

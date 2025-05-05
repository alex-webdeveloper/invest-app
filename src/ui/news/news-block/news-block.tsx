import Link from "next/link"
import type { NewsArticle } from "@/lib/data";
import Pagination from '@/ui/pagination';
import { getNews } from '@/lib/data';
import { getFilteredItems } from '@/lib/utils';


export default async function NewsBlock({ currentPage }: {
  currentPage: number;
}) {
  const articles = await getNews();
  const { itemsPerPage, totalPages } = getFilteredItems<NewsArticle>(articles, currentPage, null);

  return (
    <div className="space-y-6">
      {itemsPerPage.map(article => (
        <section
          key={article.title}
          className="bg-background text-foreground rounded-lg border border-foreground p-5 shadow-sm transition-colors"
        >
          <h2 className="text-xl font-semibold mb-1">
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-stone-500 hover:underline"
            >
              {article.title}
            </Link>
          </h2>
          <p className="text-sm opacity-75">
            {article.formattedDate} • {article.source}
          </p>
        </section>
      ))}
      <div className="mt-6 flex justify-center" >
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
  placeholder: string;
}

export default function SearchStock({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    const str = e.target.value.trim();
    if (str) params.set('query', str);
    else params.delete('query');
    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="flex justify-end mb-6">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
        className="w-full sm:w-64 px-4 py-2 border border-foreground bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  )
}
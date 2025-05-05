'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import ThemeToggle from '@/ui/theme-toggle';

const navigation = [
  { name: 'Котировки', href: '/' },
  { name: 'Новости', href: '/news' },
  { name: 'Аналитика', href: '/analytics' },
];

export default function HeaderClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-foreground/10 shadow-sm">
      <nav className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-foreground">Invest-app</span>
              <div className="hidden sm:flex gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-stone-500 text-white'
                        : 'text-foreground hover:bg-stone-700 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {children}
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer sm:hidden p-2 text-foreground hover:text-white hover:bg-stone-700 rounded-md"
              >
                <span className="sr-only">Toggle Menu</span>
                {isMenuOpen ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-stone-500 text-white'
                    : 'text-foreground hover:bg-stone-700 hover:text-white'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

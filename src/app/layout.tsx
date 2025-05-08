import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/component/footer";
import Header from "@/component/header";
import { Providers } from '@/component/providers';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isProduction = process.env.VERCEL_ENV === 'production';
console.log('VERCEL_ENV', process.env.VERCEL_ENV);

export const metadata: Metadata = {
  title: "Котировки и курсы акций-invest-app.ru",
  description: "Вся информация предоставлена Московской биржей (MOEX ISS API) в режиме реального времени: текущие котировки акций ведущих компаний.",
  robots: isProduction ? 'index, follow' : 'noindex, nofollow',
  alternates: {
    canonical: isProduction ? 'https://www.invest-ru.ru': undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

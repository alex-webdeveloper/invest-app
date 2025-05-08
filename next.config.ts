import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  images: {
    domains: [
      'lenta.ru',
      'rssexport.rbc.ru',
      'www.interfax.ru/rss.asp',
      'ria.ru/export/rss2/economy/index.xml'
    ],
  },
};

export default nextConfig;

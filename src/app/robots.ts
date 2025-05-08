import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/api/', '/analytics'],
    },
    sitemap: 'https://www.invest-ru.ru/sitemap.xml',
  }
}
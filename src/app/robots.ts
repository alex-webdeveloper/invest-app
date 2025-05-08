import type { MetadataRoute } from 'next'

const isProduction = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/api/', '/analytics'],
    },
    sitemap: 'https://www.invest-ru.ru/sitemap.xml',
  }
}

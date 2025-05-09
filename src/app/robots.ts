import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function robots(request: Request): MetadataRoute.Robots {
	const host = request.headers.get('host') || '';
	const isProduction = host === 'www.invest-ru.ru';

	if (!isProduction) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		};
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/login', '/api/', '/analytics'],
		},
		sitemap: 'https://www.invest-ru.ru/sitemap.xml',
	};
}

import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'invest-ru',
    short_name: 'invest-ru',
    description: 'Вся информация предоставлена Московской биржей (MOEX ISS API) в режиме реального времени: текущие котировки акций и девиденты ведущих компаний и новости экономики с таких ресурсов как RBC, Lenta, и Interfax',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
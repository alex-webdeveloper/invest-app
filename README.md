Invest App

invest-app развёрнуто на Vercel: [DEMO](https://www.invest-ru.ru) 
Invest App — это современное веб-приложение на базе Next.js, предоставляющее в реальном времени экономические новости, котировки акций и аналитику по дивидендам.

📊 Основной функционал
Новости экономики от: RBC, Lenta, Interfax

Котировки акций и дивиденды с Московской биржи (MOEX ISS API)

Приватный раздел "Аналитика" — защищённый паролем доступ к данным по дивидендам


🔧 Технологии
Next.js (App Router)

TypeScript

Tailwind CSS

NextAuth.js — авторизация через Email, VK, Google, GitHub

MOEX ISS API — данные о бирже

Vercel — хостинг и деплой


🔐 Аутентификация
Поддержка входа через Email, GitHub и Google

Защищённая страница /analytics доступна только авторизованным пользователям

🛡 Особенности
Аутентификация через социальные сети и email/пароль

Приватные маршруты и серверные действия (server actions)

Защищённая страница “Аналитика” (только для авторизованных пользователей)

Настроенный адаптивный и доступный UI


🚀 Запуск проекта
git clone https://github.com/alex-webdeveloper/invest-app.git
cd invest-app
npm install
npm run dev


📁 Структура
/analytics — защищённая страница с аналитикой по дивидендам

/login — форма входа с соцсетями и email

/news — лента экономических новостей

/ — главная страница с котировками


🧪 Пример .env файла
# Auth.js config
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret





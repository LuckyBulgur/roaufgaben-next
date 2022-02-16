/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    serverUrl: (process.env.NODE_ENV == "development") ? 'http://localhost:3001' : 'https://luckybulgur.de',
  },
  reactStrictMode: true,
  images: {
    domains: ['cdnjs.cloudflare.com', 'raw.githubusercontent.com'],
  },
  i18n: {
    locales: ['de-DE'],
    defaultLocale: 'de-DE'
  }
}

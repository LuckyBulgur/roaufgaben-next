const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    serverUrl: (process.env.NODE_ENV == "development") ? 'http://localhost:3001' : 'https://server.roaufgaben.de',
  },
  reactStrictMode: true,
  images: {
    domains: ['cdnjs.cloudflare.com', 'raw.githubusercontent.com'],
  },
  i18n: {
    locales: ['de-DE'],
    defaultLocale: 'de-DE'
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV == "development"
  }
});

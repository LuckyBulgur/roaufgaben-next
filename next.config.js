/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    serverUrl: (process.env.NODE_ENV == "development") ? 'http://localhost:3001' : 'https://luckybulgur.de',
  },
  reactStrictMode: true,
}

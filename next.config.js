/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL ?? 'https://luckybulgur.de/api',
  },
  reactStrictMode: true,
}

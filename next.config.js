require("dotenv").config();

module.exports = {
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL ?? 'http://localhost:3001',
  },
  reactStrictMode: true,
}

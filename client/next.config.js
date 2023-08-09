/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;

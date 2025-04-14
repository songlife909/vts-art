/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ui-avatars.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'speedwings.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: "images.pexels.com",
      }
    ],
  },
}

module.exports = nextConfig

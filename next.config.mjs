/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'fastly.4sqi.net',
      'ss3.4sqi.net',
      'fastly.jsdelivr.net',
      'images.unsplash.com',
      'api.foursquare.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.4sqi.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.jsdelivr.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
    unoptimized: true, // Keep this to bypass image optimization
  },
  // Increase production build memory limit
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.airstack.xyz'
      }
    ]
  }
};

module.exports = nextConfig;

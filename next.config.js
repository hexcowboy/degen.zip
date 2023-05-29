/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.airstack.xyz",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
    ],
  },
};

module.exports = nextConfig;

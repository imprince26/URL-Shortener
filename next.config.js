/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commenting this line out
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;

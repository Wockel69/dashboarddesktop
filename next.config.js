/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

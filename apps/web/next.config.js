/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Enable static image imports
  images: {
    domains: [],
  },
};

export default nextConfig;

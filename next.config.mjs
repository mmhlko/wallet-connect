/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    output: "standalone",
    async rewrites() {
      return [
        {
          source: "/api/upload",
          destination: "https://www.imghippo.com/v1/upload",
        },
        {
          source: "/api/uri",
          destination: "https://api.jsonbin.io/v3/b",
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          hostname: 'storage.googleapis.com'
        },
        {
          hostname: 'i.imghippo.com'
        }
      ],
    },
  };

export default nextConfig;
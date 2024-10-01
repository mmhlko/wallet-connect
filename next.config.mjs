const API_URL = process.env.API_URL;
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
          source: "/api/:path*",
          destination: `${API_URL}/:path*`,
          basePath: false,
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
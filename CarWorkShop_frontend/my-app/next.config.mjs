/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.3",
        port: "8000",
        pathname: "/static/media/**",
      },
    ],
  },
};

export default nextConfig;

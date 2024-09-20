/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/photos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

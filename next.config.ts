import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The old Vercel URL is still indexed and shared; send it to the real domain.
        source: "/:path*",
        has: [{ type: "host", value: "acifuentes.vercel.app" }],
        destination: "https://www.alancifuentes.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;

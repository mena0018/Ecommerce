import { env } from "@/lib/env"
import { NextConfig } from "next"

const S3_HOSTNAME = env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = env.MEDUSA_CLOUD_S3_PATHNAME

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com"
      },
      { protocol: "https", hostname: "medusa-server-testing.s3.amazonaws.com" },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https" as const,
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME
            }
          ]
        : [])
    ]
  }
}

export default nextConfig

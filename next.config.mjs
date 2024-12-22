import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'components', 'lib'],
  },
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_STRAPI_HOST],
  },
  reactStrictMode: true,
  headers: {
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  },
}

export default withPayload(nextConfig)

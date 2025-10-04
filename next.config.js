/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['qtrypzzcjebvfcihiynt.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/Landing',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

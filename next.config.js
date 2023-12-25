/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'skfaunepoigvxpodzapd.supabase.co'
      }
    ]
  }
}

module.exports = nextConfig

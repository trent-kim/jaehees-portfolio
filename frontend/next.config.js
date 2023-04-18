/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// };

// module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: 'cdn.sanity.io'
       },
    ],
  },
  experimental: {
    appDir: false,
  },
}
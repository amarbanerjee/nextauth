/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-admin-new.s3.eu-north-1.amazonaws.com',
        port: '',
        
      },
    ],
  },
};


export default nextConfig;

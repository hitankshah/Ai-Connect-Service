/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)', // Apply to all routes
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "frame-ancestors 'self';", // Adjust as needed for your use case
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
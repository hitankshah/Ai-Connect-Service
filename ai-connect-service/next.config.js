// next.config.js
const securityHeaders = [
    {
      key: 'Content-Security-Policy',
      value: "frame-ancestors 'self';" 
    },
  ];
  
  module.exports = {
    async headers() {
      return [
        {
          source: '/(.*)', 
          headers: securityHeaders,
        },
      ];
    },
  };
  
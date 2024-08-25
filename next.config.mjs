// next.config.js
const nextConfig = {
    webpack: (config, { dev }) => {
      // Ensure Webpack does not alter the output path in development mode
      if (dev) {
        config.output.path = config.output.path || undefined; // Prevent setting path
      }
      return config;
    },
  };
  
  export default nextConfig;
  
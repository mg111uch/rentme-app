const nextConfig = {
    allowedDevOrigins: [
        '*',
        'local-origin.dev', '*.local-origin.dev',
        'http://192.168.130.80:3000', // Replace with your local network IP
        'http://localhost:3000',   // Include localhost for local testing
    ],
};

module.exports = nextConfig;
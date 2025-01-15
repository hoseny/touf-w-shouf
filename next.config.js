/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['app.misrtravelco.net'],
    },
    staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;

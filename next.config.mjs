/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/shopping/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn1.gstatic.com',
                port: '',
                pathname: '/shopping/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn2.gstatic.com',
                port: '',
                pathname: '/shopping/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn3.gstatic.com',
                port: '',
                pathname: '/shopping/**',
            },
        ],
    },
};

export default nextConfig;

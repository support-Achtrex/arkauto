/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ebayimg.com',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
            {
                protocol: 'https',
                hostname: 'klbtheme.com',
            },
            {
                protocol: 'https',
                hostname: 'www.rockauto.com',
            },
            {
                protocol: 'https',
                hostname: 'www.mannol.de',
            }
        ],
    },
};

export default nextConfig;

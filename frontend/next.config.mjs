import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();


/** @type {import('next').NextConfig} */
const nextConfig = {
//TODO: REMOVE THIS IMAGE DOMAIN OF CDN.PFPS.GG
    images: {
        domains: ['localhost', 'cdn.pfps.gg','res.cloudinary.com', 'static.shuffle.dev'],
    },
    
};

export default withNextIntl(nextConfig);

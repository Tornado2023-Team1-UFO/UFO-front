/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}
module.exports = {
    images: {
        domains: ['static.camp-fire.jp', 
        'placekitten.com', 
        'lh3.googleusercontent.com'], // Add your domain(s) here
    },
    reactStrictMode: false
};


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}
module.exports = {
    images: {
        domains: ['static.camp-fire.jp', 'placekitten.com'], // Add your domain(s) here
    },
};


/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	env: {
		BASE_URL: process.env.BASE_URL,
	  },
	  images: {
		domains: ['res.cloudinary.com','i.seadn.io',"https://nft-cdn.alchemy.com"],
	  },
};

module.exports = nextConfig;

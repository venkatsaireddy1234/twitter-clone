/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "help.twitter.com",
      "image.cnbcfm.com",
      "saurav.tech",
      "lh3.googleusercontent.com",
      "a57.foxnews.com",
      "randomuser.me",
      "firebasestorage.googleapis.com",
      "cdn.cms-twdigitalassets.com",
      "cdn.vox-cdn.com",
      "cdn.cnn.com",
    ],
  },
};

module.exports = nextConfig;

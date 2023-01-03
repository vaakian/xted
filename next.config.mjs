// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // hostname "talkstar-photos.s3.amazonaws.com" is not configured under images in your `next.config.js`
  images: {
    unoptimized: true,
    domains: ["talkstar-photos.s3.amazonaws.com"],
  },
};
export default config;

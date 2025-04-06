/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")(
  // path to i18n.ts
  "./locales/i18n.ts"
);

const nextConfig = {};

module.exports = withNextIntl(nextConfig);

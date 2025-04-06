import createMiddleware from "next-intl/middleware";
import Config from "@config";

export default createMiddleware({
  // A list of all locales that are supported
  locales: Object.keys(Config.locales),

  // Used when no locale matches
  defaultLocale: Config.defaultLocale,

  localePrefix: "always",
});

export const config = {
  // Match a variety of pathnames
  matcher: [
    "/",

    // Match all path with /:locale/:path
    "/(en|zh)/:path*",

    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",

    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)'
  ],
};

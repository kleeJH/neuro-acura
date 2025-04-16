import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import Config from "@config";

const nextIntlMiddleware = createMiddleware({
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
    // - … if they start with `/api`, `/auth`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // * - _next/static (static files)
    // * - _next/image (image optimization files)
    // * - favicon.ico (favicon file)
    "/((?!api|auth|_next|_vercel|_next/static|_next/image|favicon.ico|.*\\..*).*)",

    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // "/((?!api|_next|_vercel|.*\\..*).*)",

    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)'
  ],
};

export default async function middleware(request: NextRequest) {
  const response = nextIntlMiddleware(request);
  return await updateSession(request, response);
}

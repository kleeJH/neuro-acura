import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Helper to ensure redirect path is relative (avoid open redirect)
function sanitizeRedirectPath(path: string | null): string | null {
  if (!path) return null;
  try {
    // Disallow absolute URLs
    if (path.startsWith("http://") || path.startsWith("https://")) return null;
    // Ensure leading slash
    if (!path.startsWith("/")) return null;
    return path;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = sanitizeRedirectPath(
    requestUrl.searchParams.get("redirect_to")?.toString() ?? null
  );

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) return NextResponse.redirect(`${origin}${redirectTo}`);

  return NextResponse.redirect(`${origin}/dashboard`);
}

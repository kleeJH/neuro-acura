import Config from "@config";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { baseMetadata } from "../metadata";
import { StyleProviders } from "./[locale]/providers";
import { Theme } from "@radix-ui/themes";

// Supabase
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const metadata: Metadata = { ...baseMetadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  return (
    <html suppressHydrationWarning lang={Config.defaultLocale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon0.svg" sizes="any" />
        <link rel="icon" href="/icon1.png" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
          type="image/png"
          sizes="180x180"
        />
      </head>
      <body>
        <SpeedInsights />
        <Analytics />
        <StyleProviders>
          <Theme>{children}</Theme>
        </StyleProviders>
      </body>
    </html>
  );
}

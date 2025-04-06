import type { Metadata } from "next";

export const WEBSITE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://neuroacura.com/";

export const tagline =
  "NeuroAcura: Revolutionizing Mental and Cognitive Health Through Neurofeedback Therapy";

export const baseMetadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    default: "NeuroAcura",
    template: "%s",
  },
  description: tagline,
  keywords: [
    "neuro acura",
    "neuroacura",
    "neuro",
    "acura",
    "therapy",
    "mental health",
    "cognitive health",
    "neurofeedback",
  ],
  authors: [
    {
      name: "Jun Hong",
      url: "https://github.com/kleeJH",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "NeuroAcura",
    description: tagline,
    siteName: "NeuroAcura",
    images: [
      {
        url: "/assets/images/tdj/tdj_front-gate.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "NeuroAcura",
    card: "summary_large_image",
    images: [
      {
        url: "/assets/images/tdj/tdj_front-gate.jpg",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

interface MetaParamsForPath {
  title: string;
  description: string;
}

/** Helper to build opengraph metadata for a user, you should call this in generateMetadata() next function */
export const buildMetaForUser = async ({
  title,
  description,
}: MetaParamsForPath): Promise<Metadata> => {
  const ogImageUrl = `${WEBSITE_URL}/api/user`;

  return buildMeta({
    ogImageUrl,
    title,
    description,
  });
};

const buildMeta = async ({
  ogImageUrl,
  description,
  title,
}: {
  ogImageUrl: string;
  description?: string;
  title?: string;
}): Promise<Metadata> => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  baseMetadata.openGraph!.images = ogImageUrl;
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  baseMetadata.twitter!.images = ogImageUrl;

  if (description) {
    baseMetadata.description = description;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    baseMetadata.twitter!.description = description;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    baseMetadata.openGraph!.description = description;
  }

  if (title) {
    baseMetadata.title = title;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    baseMetadata.twitter!.title = title;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    baseMetadata.openGraph!.title = title;
  }

  return baseMetadata;
};

export default baseMetadata;

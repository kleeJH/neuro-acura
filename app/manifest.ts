import type { MetadataRoute } from "next";
import { tagline } from "./metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeuroAcura",
    short_name: "NeuroAcura",
    description: tagline,
    start_url: "/",
    icons: [
      {
        src: "/assets/images/logos/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/images/logos/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}

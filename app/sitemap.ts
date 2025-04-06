import type { MetadataRoute } from "next";

const URL = "https://neuroacura.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/tos`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/privacy`,
      lastModified: new Date(),
    },
  ];
}

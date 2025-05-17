import { getRequestConfig } from "next-intl/server";
import Config from "@config";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !Object.keys(Config.locales).includes(locale as any)) {
    locale = Config.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});

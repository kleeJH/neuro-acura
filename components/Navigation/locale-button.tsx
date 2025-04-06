"use client";

import Config from "@config";

import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import "./Navigation.css";

const LocaleSwitch = () => {
  const t = useTranslations("Locale");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [nextLocale, setNextLocale] = useState<string>(currentLocale);
  const [toggleLocaleDropdown, setToggleLocaleDropdown] =
    useState<boolean>(false);

  let localeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: Event) => {
      if (
        localeDropdownRef.current &&
        !localeDropdownRef.current.contains(e.target as Node)
      )
        setToggleLocaleDropdown(false);
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [localeDropdownRef]);

  const handleDropdownItemClick = (newLocale: string) => {
    // Don't do anything if current locale is same
    if (currentLocale === newLocale) return;

    // Else, set next locale and change route path
    setNextLocale(newLocale);
    const regex = new RegExp(
      `(/(${Object.keys(Config.locales).join("|")}))+/?`,
      "g"
    );
    router.replace(`/${newLocale}/${pathname.replaceAll(regex, "")}`);
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="square-button"
        onClick={() => setToggleLocaleDropdown(!toggleLocaleDropdown)}
        ref={localeDropdownRef}
      >
        <Image
          src={Config.locales[nextLocale].icon}
          alt={`${t(nextLocale)}`}
          height={20}
          width={20}
        />
      </motion.div>

      <AnimatePresence>
        {toggleLocaleDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background absolute top-16 w-fit -translate-x-[31%] border-solid border-[1px] border-accent rounded-lg p-2 overflow-hidden focus:outline-none focus-visible:ring-2 cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              {Object.keys(Config.locales).map((locale) => (
                <div
                  key={locale}
                  className="h-10 w-full flex items-center rounded-lg p-2 hover:bg-secondary transition duration-500 font-semibold"
                  onClick={() => handleDropdownItemClick(locale)}
                >
                  <Image
                    src={Config.locales[locale].icon}
                    alt={`${t(locale)}`}
                    height={30}
                    width={30}
                    className="pr-2"
                  />
                  {`${t(locale)}`}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocaleSwitch;

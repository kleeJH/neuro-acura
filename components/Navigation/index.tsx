"use client";

import Config from "@config";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@stores/useUserStore";

const DesktopNavigation = dynamic(() => import("./desktop-nav"), {
  ssr: false,
});
const MobileNavigation = dynamic(() => import("./mobile-nav"), { ssr: false });

const Navigation = ({
  bgType = "default",
  hasNavLinks = true,
}: {
  bgType?: "default" | "transparent";
  hasNavLinks?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname);

  const user = useUserStore((state) => state.user);

  return (
    <>
      <nav
        style={{ position: "sticky" }}
        className={`${
          bgType === "default" ? "bg-background" : ""
        } z-50 w-full flex items-center py-4 top-0 fixed`}
      >
        <div className="container h-fit justify-between items-center inline-flex">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="relative flex items-center gap-4 cursor-pointer"
            onClick={() => router.replace("/")}
          >
            <Image
              src={Config.logoLowDef}
              alt="NeuroAcura Logo"
              width={32}
              height={32}
              className="object-contain drop-shadow-md"
            />
            <p className="max-sm:hidden font-satoshi font-bold cursor-pointer text-base tracking-wide orange-text-gradient drop-shadow-md">
              NeuroAcura
            </p>
            <p className="sm:hidden font-bold cursor-pointer text-lg tracking-wide orange-text-gradient drop-shadow-md">
              NeuroAcura
            </p>
          </div>

          {hasNavLinks && user && (
            <ul className="list-none flex flex-row gap-10 max-nav:hidden">
              {Config.navigationLinks.map((nav) => (
                <li
                  key={nav.href}
                  className={`${
                    active === nav.title
                      ? "text-accent drop-shadow-md"
                      : "text-textDefault"
                  } hover:text-accent font-inter font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setActive(nav.title);
                    router.replace(nav.href);
                  }}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          )}

          {hasNavLinks && <DesktopNavigation />}
          <MobileNavigation
            hasNavLinks={hasNavLinks}
            active={active}
            setActive={setActive}
          />
        </div>
      </nav>
    </>
  );
};

export default Navigation;

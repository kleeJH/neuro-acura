"use client";

import { RadixColorOptions } from "@common/enum";
import AvatarMenu from "@components/basic/ui/avatarMenu";
import { Button } from "@radix-ui/themes";
import { useUserStore } from "@stores/useUserStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavigation = ({
  hasNavLinks = true,
}: {
  hasNavLinks: boolean;
}) => {
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);

  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  return (
    <div
      className={`flex gap-10 items-center ${
        hasNavLinks ? "max-nav:hidden" : ""
      }`}
    >
      <>
        {user ? (
          <AvatarMenu size="3" />
        ) : (
          <div className="flex gap-3 md:gap-5">
            {!isAuthPage && (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="solid"
                    style={{
                      backgroundColor: "var(--foreground)",
                      borderColor: "var(--accent)",
                      border: "1px solid var(--accent)",
                      color: "var(--text-default)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--foreground)";
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    variant="surface"
                    color={RadixColorOptions.GRAY}
                    highContrast
                    style={{
                      color: "var(--text-default)",
                    }}
                  >
                    Create account
                  </Button>
                </Link>
              </>
            )}
            {/* <LocaleSwitch /> */}
            {/* <ThemeSwitch /> */}
          </div>
        )}
      </>
    </div>
  );
};

export default DesktopNavigation;

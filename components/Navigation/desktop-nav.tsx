"use client";

import DefaultAvatar from "@public/assets/icons/avatar-default.svg";
import Link from "next/link";
import { Button, Avatar, DropdownMenu, Box } from "@radix-ui/themes";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@stores/useUserStore";
import { randomizeRadixColor } from "@utils/utils";
import { RadixColorOptions } from "@common/enum";
import { LogOut } from "lucide-react";
import { signOutAction } from "@utils/supabase/actions";

const DesktopNavigation = ({
  hasNavLinks = true,
}: {
  hasNavLinks: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const handleLogout = async () => {
    await signOutAction(); // Supabase logout

    // Immediately clear your Zustand state
    setUser(null);
  };

  return (
    <div
      className={`flex gap-10 items-center ${
        hasNavLinks ? "max-nav:hidden" : ""
      }`}
    >
      <>
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" style={{ padding: 0 }} radius="full">
                <Avatar
                  size="2"
                  variant="solid"
                  radius="full"
                  color={RadixColorOptions.GRAY}
                  fallback={
                    <Box width="20px" height="20px">
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                          fill="#2e3436"
                        />
                      </svg>
                    </Box>
                  }
                />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {/* <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                Log Out
              </DropdownMenu.Item>
              <DropdownMenu.Separator /> */}
              <DropdownMenu.Item
                color="red"
                onSelect={async () => await handleLogout()}
              >
                <LogOut height={16} width={16} /> {"Log Out"}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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

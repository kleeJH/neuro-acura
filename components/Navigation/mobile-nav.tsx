import Config from "@config";

import { Drawer } from "antd";
import { motion } from "framer-motion";
import { AlignJustify } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import AvatarMenu from "@components/basic/ui/avatarMenu";
// import LocaleSwitch from "./locale-button";
import { useUserStore } from "@stores/useUserStore";
import ThemeSwitch from "./theme-button";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const MobileNavigation = ({
  hasNavLinks = true,
  active,
  setActive,
}: {
  hasNavLinks: boolean;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);

  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const [toggleMobileDrawer, setToggleMobileDrawer] = useState<boolean>(false);

  const showDrawer = () => {
    setToggleMobileDrawer(true);
  };

  const onClose = () => {
    setToggleMobileDrawer(false);
  };

  return (
    <>
      <div className="nav:hidden flex flex-1 justify-end items-center gap-8">
        {user ? (
          <AvatarMenu size="3" />
        ) : (
          <div>
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
              </>
            )}
          </div>
        )}
        <motion.div
          className="square-button"
          whileTap={{ scale: 0.8 }}
          onClick={showDrawer}
        >
          <AlignJustify aria-hidden="true" className="h-5 w-5" />
        </motion.div>
      </div>

      <Drawer
        title=""
        placement="right"
        onClose={onClose}
        open={toggleMobileDrawer}
        width={250}
        extra={
          <div className="flex justify-between items-center gap-3 md:gap-5">
            <ThemeSwitch />
          </div>
        }
      >
        <ul className="list-none flex flex-col gap-10 select-none">
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
                onClose();
              }}
            >
              {nav.title}
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};

export default MobileNavigation;

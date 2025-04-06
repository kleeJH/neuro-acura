import Config from "@config";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Drawer } from "antd";
import { AlignJustify } from "lucide-react";

import LocaleSwitch from "./locale-button";
import ThemeSwitch from "./theme-button";

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

  const [toggleMobileDrawer, setToggleMobileDrawer] = useState<boolean>(false);

  const showDrawer = () => {
    setToggleMobileDrawer(true);
  };

  const onClose = () => {
    setToggleMobileDrawer(false);
  };

  return (
    <>
      <div className="nav:hidden flex flex-1 justify-end items-center">
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
          <div className="flex justify-end items-center gap-3 md:gap-5">
            {/* <LocaleSwitch /> */}
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

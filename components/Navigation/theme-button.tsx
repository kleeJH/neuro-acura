"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import CustomTooltip from "@components/basic/Tooltip";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CustomTooltip content="Change Theme">
      {mounted ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="square-button"
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          type="button"
        >
          {resolvedTheme === "dark" && (
            <Moon aria-hidden="true" className="h-5 w-5" />
          )}
          {resolvedTheme === "light" && (
            <Sun aria-hidden="true" className="h-5 w-5" />
          )}
        </motion.button>
      ) : null}
    </CustomTooltip>
  );
};

export default ThemeSwitch;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpToLine } from "lucide-react";
import { Tooltip } from "@radix-ui/themes";
import CustomTooltip from "../Tooltip";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <CustomTooltip
          children={
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.05 } }}
              exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 square-button"
            >
              <ArrowUpToLine className="w-5 h-5" />
            </motion.button>
          }
          content="Back to Top"
          side="left"
        />
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import ThemeSwitch from "@components/Navigation/theme-button";

export default function MenuFloatLeftButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start max-nav:hidden"
      onPointerLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col mb-2 space-y-2"
          >
            <ThemeSwitch />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsOpen(true)}
        initial={false}
        animate={{ scale: isOpen ? 0.9 : 1 }}
        whileTap={{ scale: 0.95 }}
        className="square-button"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </motion.button>
    </motion.div>
  );
}

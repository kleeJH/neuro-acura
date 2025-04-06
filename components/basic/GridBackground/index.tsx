"use client";

import { motion } from "framer-motion";

const BackgroundGrid = () => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        animate={{ opacity: 1 }}
        className="moving-grid-background absolute h-[200%] w-full"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <div className="shadow-background absolute h-full w-full rounded-full shadow-[inset_0_0_5rem_3rem]" />
    </div>
  );
};

export default BackgroundGrid;

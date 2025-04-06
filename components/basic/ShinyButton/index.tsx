import React, { ReactNode } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

// import { styles } from "@styles/sharedStyles";
import "./ShinyButton.css";

interface ShinyButtonProps {
  buttonText: string;
  buttonPadding?: string;
  buttonRounded?: string;
  textStyles?: string;
  icon?: ReactNode;
  callbackFunc?: Function;
}

const ShinyButton = ({
  buttonText,
  buttonPadding = "px-5 py-1",
  buttonRounded = "rounded-lg",
  textStyles = "text-textDefault",
  icon = <></>,
  callbackFunc = () => {},
}: ShinyButtonProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      className={`w-fit ${
        resolvedTheme === "light" ? "shiny-button" : "shiny-button-dark"
      } ${buttonRounded} cursor-pointer p-[1.5px] shadow-md select-none`}
      onClick={() => callbackFunc()}
    >
      <div
        className={`w-fit flex flex-row gap-2 justify-center items-center ${buttonRounded} ${buttonPadding} bg-white hover:bg-slate-100 dark:bg-neutral-900 hover:dark:bg-black `}
      >
        {icon}
        <span className={`${textStyles} font-semibold`}>{buttonText}</span>
      </div>
    </motion.div>
  );
};

export default ShinyButton;

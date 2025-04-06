"use client";

import Config from "@config";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { notification } from "antd";

import { styles } from "@styles/sharedStyles";
import "./EnvelopeAddressCard.css";

const EnvelopeAddressCard = () => {
  const [api, contextHolder] = notification.useNotification();

  const [showCopyButton, setShowCopyButton] = useState<boolean>(false);

  const openNotification = () => {
    navigator.clipboard.writeText(
      `${Config.personal.address.street} ${Config.personal.address.residential} ${Config.personal.address.postalTown} ${Config.personal.address.stateCountry}`
    );
    api.success({
      message: "Address has been copied!",
      description: "",
      placement: "bottomLeft",
      duration: 3,
      style: { fontWeight: 500 },
      className: "bg-foreground",
    });
  };

  return (
    <>
      {contextHolder}
      <motion.div
        className="relative envelope rounded-xl w-[80%] max-lg:w-full max-md:w-[80%] max-sm:w-full h-fit p-2 border-black border-[1px] shadow-3xl"
        whileHover={{ scale: 1.2 }}
        onHoverStart={() => {
          setShowCopyButton(true);
        }}
        onHoverEnd={() => {
          setShowCopyButton(false);
        }}
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          className={`absolute top-5 right-5 square-button !bg-accent !border-primary ${
            showCopyButton ? "" : "md:hidden"
          }`}
          onClick={openNotification}
        >
          <Copy aria-hidden="true" className="h-3 w-3" />
        </motion.button>
        <div className="bg-foreground p-5 rounded-xl border-black border-[1px]">
          <p className={styles.withinSectionAddressText}>
            {Config.personal.address.street} <br />
            {Config.personal.address.residential} <br />
            {Config.personal.address.postalTown}
            <br />
            {Config.personal.address.stateCountry}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default EnvelopeAddressCard;

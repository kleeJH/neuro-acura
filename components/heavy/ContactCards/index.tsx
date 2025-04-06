"use client"

import { motion } from "framer-motion";
import { notification } from "antd";
import { useIsMobile } from "@utils/useIsMobile";
import InteractiveCard from "@components/basic/InteractiveCard";
import Image from "next/image";

import Config from "@config";

interface ContactCardProps {
  title: string;
  description: string;
  icon: string;
}

const ContactCard = ({ title, description, icon }: ContactCardProps) => {
  const isMobile = useIsMobile();

  function getRandomInt(min: number, max: number) {
    return Math.max(min, Math.floor(Math.random() * max));
  }

  return (
    <InteractiveCard
      title={title}
      titleClassName="blue-pink-text-gradient w-fit !text-3xl"
      description={description}
      descriptionClassName="group-hover:text-accent !font-semibold !text-md"
      width="w-[300px]"
      height="h-[300px]"
      className="group drop-shadow-lg"
    >
      {Array.from(Array(isMobile ? 15 : 25).keys()).map((key) => (
        <Image
          key={key}
          src={icon}
          alt="Icon"
          style={{
            left: getRandomInt(20, 250),
            animationDelay: `${getRandomInt(200, 5000)}ms`,
          }}
          className={`opacity-0 absolute bottom-[0px] group-hover:block group-hover:animate-float transition max-sm:animate-float`}
          width={getRandomInt(20, 40)}
          height={20}
        />
      ))}
    </InteractiveCard>
  );
};

const ContactCards = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    navigator.clipboard.writeText(Config.socials["phone"].number);
    api.success({
      message: `Phone number has been copied!`,
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
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-10">
        <motion.div
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer"
          onClick={openNotification}
        >
          <ContactCard
            title="Phone"
            description="Call us via +60362761557"
            icon="/assets/icons/phone.svg"
          />
        </motion.div>

        <motion.a
          whileTap={{ scale: 0.8 }}
          href={Config.socials["whatsapp"].href}
          target="_block"
        >
          <ContactCard
            title="WhatsApp"
            description="Book an appointment via +60162614308"
            icon="/assets/icons/whatsapp.svg"
          />
        </motion.a>

        <motion.a
          whileTap={{ scale: 0.8 }}
          href={Config.socials["facebook"].msgLink}
          target="_block"
        >
          <ContactCard
            title="Facebook"
            description="Message us via Facebook!"
            icon="/assets/icons/facebook.svg"
          />
        </motion.a>
      </div>
    </>
  );
};

export default ContactCards;

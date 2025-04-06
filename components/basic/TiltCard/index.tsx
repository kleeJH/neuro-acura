import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

import { fadeIn } from "@utils/motion";
import Config from "@config";

const TiltCard = ({
  index,
  icon,
  className = "",
}: {
  index: number;
  icon: string | StaticImport;
  className?: string;
}) => {
  return (
    <Tilt
      className={`xl:w-[210px] sm:w-[200px] xs:w-[150px] w-[100px] ${className}`}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.7)}
        className="w-full card-border-gradient p-1 rounded-xl shadow-xm"
      >
        <Image
          src={icon}
          loading="lazy"
          width={210}
          alt="Hero Picture"
          className=" w-fit h-fit object-contain rounded-xl"
        />
      </motion.div>
    </Tilt>
  );
};

const HeroTiltCards = () => {
  const cards = [
    {
      icon: Config.hero.picture1,
      motionProps: {
        initial: {
          y: -80,
          x: 40,
          opacity: 0,
        },
        animate: {
          y: -70,
          opacity: 1,
        },
      },
    },
    {
      icon: Config.hero.picture2,
      motionProps: {
        initial: {
          y: 60,
          x: 0,
          opacity: 0,
        },
        animate: {
          y: 50,
          opacity: 1,
        },
      },
    },
    {
      icon: Config.hero.picture3,
      motionProps: {
        initial: {
          y: -40,
          x: -30,
          opacity: 0,
        },
        animate: {
          y: -30,
          opacity: 1,
        },
      },
    },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          animate={Object.assign({}, card.motionProps.animate, {
            transition: {
              duration: 0.4,
            },
          })}
          initial={card.motionProps.initial}
          whileHover={{
            zIndex: 100,
            scale: 1.1,
          }}
        >
          <TiltCard index={index} icon={card.icon} />
        </motion.div>
      ))}
    </>
  );
};

export default HeroTiltCards;

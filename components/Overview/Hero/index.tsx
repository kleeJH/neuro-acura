"use client";

import Config from "@config";

import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

import BackgroundGrid from "@components/basic/GridBackground";
import ShinyButton from "@components/basic/ShinyButton";

import { styles } from "@styles/sharedStyles";
import "./Hero.css";

const HeroTiltCards = dynamic(() => import("@components/basic/TiltCard"));

const Hero = () => {
  const router = useRouter();
  return (
    <div className="container relative min-h-[calc(90vh)] max-nav:pt-16 overflow-hidden">
      <span className="relative h-[calc(30vh)]" />
      <div className="absolute inset-10 -z-30 overflow-hidden rounded-full opacity-70 nav:hidden">
        <BackgroundGrid />
      </div>

      <div className="relative grid justify-center items-center grid-cols-1 nav:grid-cols-2 gap-10 nav:gap-24 3xl:pt-[calc(10vh)]">
        <div className="flex flex-col gap-5 justify-center items-center nav:items-start">
          <div className="flex w-fit flex-row justify-center items-center gap-5 nav:pr-5">
            <motion.span
              whileInView={{
                rotate: [0, -5, 10, 0],
                transition: { duration: 1 },
              }}
              whileHover={{
                rotate: [0, -5, 10, 0],
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
              }}
              className="max-sm:w-32"
            >
              <Image
                src={Config.logoLowDef}
                alt="NeuroAcura's Logo"
                width={170}
                height={170}
                className="px-4 py-2 drop-shadow-md"
              />
            </motion.span>
            <div className="flex flex-col justify-center items-center">
              <h1 className={`${styles.heroHeadText}`}>NeuroAcura</h1>
            </div>
          </div>
          <p
            className={`${styles.heroSubText} nav:text-left text-center max-nav:px-20 max-sm:w-[315px] max-sm:px-0`}
          >
            Revolutionizing Mental and Cognitive Health Through Neurofeedback
            Therapy
          </p>
          <motion.div
            whileTap={{
              scale: 0.8,
            }}
          >
            <ShinyButton
              buttonText="Start Exploring!"
              callbackFunc={() => {
                router.replace("/#about");
              }}
              icon={<Compass aria-hidden="true" className="h-4 w-4" />}
            />
          </motion.div>
        </div>

        <div className="relative flex sm:flex-row justify-center items-center overflow-visible h-[400px] sm:h-[500px] nav:h-[600px] w-full">
          <div className="hidden nav:flex absolute -inset-40 top-1/2 -z-30 -translate-y-1/2 translate-x-[-30px] overflow-hidden rounded-full">
            <BackgroundGrid />
          </div>
          <HeroTiltCards />
        </div>
      </div>

      <div className="pt-[50px] flex flex-row justify-center">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="p-5 border-2 border-accent rounded-full animate-bounce cursor-pointer"
          onClick={() => {
            router.replace("/#about");
          }}
        >
          <ArrowDown aria-hidden="true" className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

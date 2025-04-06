"use client";

// import Config from "@config";

import {
  // useState,
  useRef,
} from "react";
import { motion } from "framer-motion";

import { Carousel } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CarouselRef } from "antd/es/carousel";

const CarouselWithArrows = ({
  children,
  heightFrame = "w-[385px] sm:w-[400px] md:w-[500px] lg:w-[700px]",
}: {
  heightFrame?: string;
  children: React.ReactNode;
}) => {
  // const [carouselHeight, setCarouselHeight] = useState<number>(0);
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <div className="flex flex-row justify-center items-center sm:gap-5 md:gap-10">
      <motion.div
        className="hidden sm:block p-1 sm:p-2 md:p-4 border-2 border-accent rounded-full cursor-pointer select-none w-fit"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          carouselRef.current?.prev();
        }}
      >
        <ArrowLeft aria-hidden="true" size={40} />
      </motion.div>

      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={5000}
        infinite
        dotPosition="top"
        fade
        // afterChange={(current: number) => {
        //   setCarouselHeight(Config.gallery[current].height + 30);
        // }}
        className={`${heightFrame} pt-10 select-none`}
        // style={{ height: carouselHeight }}
      >
        {children}
      </Carousel>

      <motion.div
        className="hidden sm:block p-1 sm:p-2 md:p-4 border-2 border-accent rounded-full cursor-pointer select-none"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          carouselRef.current?.next();
        }}
      >
        <ArrowRight aria-hidden="true" size={40} />
      </motion.div>
    </div>
  );
};

export default CarouselWithArrows;

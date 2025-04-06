import Image from "next/image";
import CarouselWithArrows from "@components/basic/CarouselWithArrows";

const FacebookCarousel = () => {
  const tdjPictures = [
    "/assets/images/tdj/tdj_front-gate_1.jpg",
    "/assets/images/tdj/tdj_front-gate_2.jpg",
    "/assets/images/tdj/tdj_front-gate_3.jpg",
    "/assets/images/tdj/tdj_field_1.jpg",
    "/assets/images/tdj/tdj_field_2.jpg",
    "/assets/images/tdj/tdj_field_3.jpg",
  ];
  return (
    <CarouselWithArrows heightFrame="w-[350px] xs:w-[430px] sm:w-[430px] md:w-[500px] lg:w-[700px]">
      {tdjPictures.map((pic, index) => (
        <Image
          key={index}
          src={pic}
          alt=""
          width={960}
          height={540}
          className="w-fit mx-auto rounded-xl card-border-gradient p-1"
        />
      ))}
    </CarouselWithArrows>
  );
};

export default FacebookCarousel;

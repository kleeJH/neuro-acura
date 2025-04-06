import dynamic from "next/dynamic";

import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";

const FacebookCarousel = dynamic(
  () => import("@components/heavy/FacebookCarousel")
);

const Gallery = () => {
  return (
    <>
      <div className="mb-10">
        <p className={styles.sectionSubText}>CAPTURE MOMENTS</p>
        <h2 className={styles.sectionHeadText}>Gallery.</h2>
      </div>

      <FacebookCarousel />
    </>
  );
};

export default SectionWrapper(Gallery, "gallery");

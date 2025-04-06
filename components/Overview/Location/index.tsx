import dynamic from "next/dynamic";
import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";

// const EnvelopeAddressCard = dynamic(
//   () => import("@components/heavy/EnvelopeAddressCard")
// );

const TdjCarousel = dynamic(() => import("@components/heavy/TdjCarousel"));

const Location = () => {
  return (
    <>
      <div className="mb-10">
        <p className={styles.sectionSubText}>WHERE WE ARE</p>
        <h2 className={styles.sectionHeadText}>Locate Us.</h2>
      </div>

      <h2 className={`${styles.withinSectionHeadText} mb-3`}>
        Our Kindergarten!
      </h2>
      <TdjCarousel />

      <h2 className={`${styles.withinSectionHeadText} mb-8`}>
        Our Location On Google Maps!
      </h2>
      <div className="flex justify-center items-center mt-8">
        <div className="card-border-gradient rounded-xl w-[350px] xs:w-[430px] sm:w-[430px] md:w-[500px] lg:w-[700px] h-80 sm:h-96 p-1 shadow-md shadow-foreground">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.52899924272!2d101.6224636113175!3d3.217510852713465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4671bc8fae11%3A0x35f80d5ab94f270!2sTadika%20Desa%20Jaya!5e0!3m2!1sen!2smy!4v1702712483830!5m2!1sen!2smy"
            className="border-0 w-full h-full rounded-xl dark:invert-[90%] dark:hue-rotate-180"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row gap-14 justify-start items-center mt-8">
        <div className="card-border-gradient rounded-xl w-full md:w-3/5 h-80 sm:h-96 p-1 shadow-md shadow-foreground">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.52899924272!2d101.6224636113175!3d3.217510852713465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4671bc8fae11%3A0x35f80d5ab94f270!2sTadika%20Desa%20Jaya!5e0!3m2!1sen!2smy!4v1702712483830!5m2!1sen!2smy"
            className="border-0 w-full h-full rounded-xl dark:invert-[90%] dark:hue-rotate-180"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="w-full md:w-2/5 h-fit md:h-96 px-5 flex flex-col gap-8 items-center">
          <h4 className={`${styles.withinSectionAddressHeadText} text-left`}>
            Find us at
          </h4>
          <EnvelopeAddressCard />
        </div>
      </div> */}
    </>
  );
};

export default SectionWrapper(Location, "location");

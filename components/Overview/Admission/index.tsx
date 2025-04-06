"use client";

import { useRouter } from "next/navigation";
import { Contact } from "lucide-react";

import SectionWrapper from "@components/basic/SectionWrapper";
import ShinyButton from "@components/basic/ShinyButton";

import { styles } from "@styles/sharedStyles";

const Admission = () => {
  const router = useRouter();

  const goToContact = () => {
    router.replace("/#contact");
  };
  return (
    <>
      <p className={styles.sectionSubText}>FIND OUT MORE</p>
      <h2 className={styles.sectionHeadText}>Admission.</h2>

      <p className={`${styles.withinSectionSubText} mt-3 mb-10`}>
        We are fostering a nurturing environment that encourages curiosity,
        creativity, and a love for learning.{" "}
        <strong>
          For admission or inquiry, kindly contact us. You may make an
          appointment for a school tour.
        </strong>
        <br />
        <br />
        We look forward to welcoming your family into our community and
        embarking on this{" "}
        <strong className="blue-pink-text-gradient">
          exciting educational adventure
        </strong>{" "}
        together.
        <br />
        <br />
        Clicking the button below will take you to the <strong>
          Contact
        </strong>{" "}
        section.
      </p>

      <ShinyButton
        buttonText="Contact Us Now!"
        icon={<Contact aria-hidden="true" className="h-4 w-4" />}
        callbackFunc={goToContact}
      />
    </>
  );
};

export default SectionWrapper(Admission, "admission");

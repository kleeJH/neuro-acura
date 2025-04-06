import dynamic from "next/dynamic";

import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";

const ContactCards = dynamic(() => import("@components/heavy/ContactCards"));

const Contact = () => {
  return (
    <>
      <div className="">
        <p className={styles.sectionSubText}>GET IN TOUCH</p>
        <h2 className={styles.sectionHeadText}>Contact Us.</h2>
      </div>

      <ContactCards />
    </>
  );
};

export default SectionWrapper(Contact, "contact");

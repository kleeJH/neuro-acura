import React from "react";
import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";

const About = () => {
  return (
    <>
      <div>
        <p className={styles.sectionSubText}>WHAT IS IT</p>
        <h2 className={styles.sectionHeadText}>Description.</h2>
      </div>

      <h2 className={styles.withinSectionHeadText}>The Story</h2>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        Mental health challenges such as anxiety, depression, ADHD, and
        cognitive decline are growing issues worldwide, with Malaysia
        experiencing high rates of mental health disorders (1 in 3 adults).
      </p>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        Despite this, there is a lack of accessible, non-invasive, and effective
        solutions. Many individuals face stigma, families struggle to find
        specialized care for children, and the elderly have limited options for
        cognitive enhancement.
      </p>

      <h2 className={styles.withinSectionHeadText}>The Solution</h2>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        NeuroAcura offers a groundbreaking solution by integrating neurofeedback
        therapy and psychological counseling. Neurofeedback uses real-time
        brainwave monitoring to train the brain to self-regulate, enhancing
        focus, emotional stability, memory, and behavior.
      </p>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        With NeuroAcura, we predict the anticipated outcomes and potential
        impacts of the product which will lead to - Improve Mental Health,
        Overall Well Being.
      </p>
    </>
  );
};

export default SectionWrapper(About, "about");

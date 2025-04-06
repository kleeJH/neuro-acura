import React from "react";
import { styles } from "@styles/sharedStyles";

const SectionWrapper = (Component: () => JSX.Element, idName: string) =>
  function HigherOrderComponent() {
    return (
      <section
        className={`relative ${styles.paddingY} max-w-[1400px] mx-auto sm:px-16 px-6 w-full overflow-hidden`} // min-h-[calc(100vh)] 
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    );
  };

export default SectionWrapper;

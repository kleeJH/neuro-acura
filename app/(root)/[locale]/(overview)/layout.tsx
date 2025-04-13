import React from "react";

import ScrollProgress from "@components/basic/ScrollProgress";
import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";

const OverviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative w-full h-full bg-background z-10">
        <Navigation />
        <div className="relative min-h-[calc(80vh)]">{children}</div>
        <Footer />
      </div>
      <ScrollProgress />
      <ScrollToTopButton />
      <MenuFloatLeftButton />
    </>
  );
};

export default OverviewLayout;

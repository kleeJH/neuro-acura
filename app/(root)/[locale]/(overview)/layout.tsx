import React from "react";

import ScrollProgress from "@components/basic/ScrollProgress";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";

const OverviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full h-full bg-background z-10">
      <ScrollProgress/>
      <ScrollToTopButton />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default OverviewLayout;

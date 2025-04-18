import React from "react";

import ScrollProgress from "@components/basic/ScrollProgress";
import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";
import AuthListenerProvider from "@providers/authListenerProvider";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative w-full h-full bg-background z-10">
        <AuthListenerProvider>
          <Navigation />
        </AuthListenerProvider>
        <div className="relative min-h-[calc(80vh)]">{children}</div>
        <Footer />
      </div>
      <ScrollProgress />
      <ScrollToTopButton />
      <MenuFloatLeftButton />
    </>
  );
};

export default PublicLayout;

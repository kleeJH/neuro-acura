import React from "react";

import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import Navigation from "@components/Navigation";

import AuthListenerProvider from "@providers/authListenerProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthListenerProvider>
      <div className="relative w-full h-screen bg-background z-10 flex flex-col min-h-screen overflow-hidden">
        <Navigation />
        <div className="flex-1 overflow-y-auto">{children}</div>{" "}
        <MenuFloatLeftButton />
      </div>
    </AuthListenerProvider>
  );
};

export default AuthLayout;

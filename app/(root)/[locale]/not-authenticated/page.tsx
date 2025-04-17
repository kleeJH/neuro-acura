"use client";

import dynamic from "next/dynamic";
import Navigation from "@components/Navigation";

const NotFound = dynamic(() => import("@components/NotFound"));

const NotAuthenticated = () => {
  return (
    <>
      <Navigation bgType="transparent" hasNavLinks={false} />
      <NotFound type="notAuthenticated" />
    </>
  );
};

export default NotAuthenticated;

import React from "react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import ScrollProgress from "@components/basic/ScrollProgress";
import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  // If no user data found, redirect to not-authenticated page
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/not-authenticated");
  }
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

export default ProtectedLayout;

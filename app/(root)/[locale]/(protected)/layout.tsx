import React from "react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "@components/Footer";
import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import AuthListenerProvider from "@providers/authListenerProvider";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  // Check if user is authenticated
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // If no user is found, redirect to not-authenticated page
      return redirect("/not-authenticated");
    }
  } catch (error) {
    // Handle any error that may occur while fetching user data
    // console.error("Error fetching user:", error);
    return redirect("/not-authenticated");
  }
  return (
    <>
      <AuthListenerProvider>
        <div className="relative w-full h-full bg-background z-10">
          <Navigation />
          <div className="relative min-h-[calc(80vh)]">{children}</div>
          <Footer />
        </div>
      </AuthListenerProvider>
      <ScrollToTopButton />
      <MenuFloatLeftButton />
    </>
  );
};

export default ProtectedLayout;

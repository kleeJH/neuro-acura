import React from "react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MenuFloatLeftButton from "@components/basic/MenuFloatLeftButton";
import ScrollToTopButton from "@components/basic/ScrollToTopButton";
import Navigation from "@components/Navigation";
import AuthListenerProvider from "@providers/authListenerProvider";
import { ToastProvider } from "@providers/toast-provider/toastProvider";

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
    <ToastProvider>
      <div className="bg-background min-h-screen">
        <AuthListenerProvider>
          <Navigation />
          <div className="relative min-h-[calc(100vh - 12rem)]">{children}</div>
        </AuthListenerProvider>
        <ScrollToTopButton />
        <MenuFloatLeftButton />
      </div>
    </ToastProvider>
  );
};

export default ProtectedLayout;

"use client";
import { useEffect } from "react";
import { useUserStore } from "@stores/useUserStore";
import { createClient } from "@utils/supabase/client";
import type { User } from "@supabase/supabase-js";

const supabase = createClient();

interface AuthListenerProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export default function AuthListenerProvider({
  children,
  initialUser = null,
}: AuthListenerProviderProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      const { data } = await supabase.auth.getUser();

      // Small delay ensures cookies have settled after logout.
      setTimeout(() => {
        if (isMounted) setUser(data.user ?? null);
      }, 100); // 100ms delay
    };

    // Hydrate store immediately from server provided user (no flash of unauthenticated UI)
    if (initialUser) {
      setUser(initialUser);
    }

    syncUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}

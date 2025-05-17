"use client";

import { RadixColorOptions } from "@common/enum";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { useUserStore } from "@stores/useUserStore";
import { signOutAction } from "@utils/supabase/actions";
import { Settings, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AvatarMenuProps {
  size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}
const AvatarMenu = ({ size = "2" }: AvatarMenuProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    await signOutAction(); // Supabase logout

    // Immediately clear your Zustand state
    setUser(null);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" style={{ padding: 0 }} radius="full">
          <Avatar
            size={size}
            variant="solid"
            radius="full"
            color={RadixColorOptions.CRIMSON}
            fallback={
              <Box width="20px" height="20px">
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                    fill="#ffffff"
                  />
                </svg>
              </Box>
            }
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <User2 height={16} width={16} className="mr-2" />
          {user?.email}
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => router.push("/settings")}>
          <Settings height={16} width={16} />
          {"Settings"}
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color="red"
          onSelect={async () => await handleLogout()}
        >
          <LogOut height={16} width={16} /> {"Log Out"}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AvatarMenu;

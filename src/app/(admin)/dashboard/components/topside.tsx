"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const TopSide = () => {
  const { status, data } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {status === "authenticated" && data?.user && (
        <div className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-2">
            <Avatar className="border border-gray-300">
              <AvatarFallback>
                {data.user.name?.[0].toUpperCase()}
              </AvatarFallback>

              {data.user.image && <AvatarImage src={data.user.image} />}
            </Avatar>

            <div className="flex flex-col">
              <p className="text-left text-xs opacity-75">Olá,</p>
              <span className="text-sm font-medium">{data.user.name}</span>
            </div>
          </div>

          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOutIcon size={19} />
          </Button>
        </div>
      )}
    </>
  );
};

export default TopSide;

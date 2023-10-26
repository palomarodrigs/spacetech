"use client";

import { LogInIcon, ShieldAlertIcon } from "lucide-react";
import { Button } from "./button";
import { signIn } from "next-auth/react";

const AccessDenied = () => {
  const handleLogin = async () => {
    await signIn();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center gap-1">
        <ShieldAlertIcon size={35} />
        <h2 className="font-bold">Acesso Restrito!</h2>
        <p className="text-sm opacity-60">
          Você precisa fazer login para ver os seus pedidos.
        </p>
      </div>

      <Button className="mt-3 gap-2 text-left" onClick={handleLogin}>
        <LogInIcon size={16} />
        Fazer login
      </Button>
    </div>
  );
};

export default AccessDenied;

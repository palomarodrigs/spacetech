"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DeniedPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 p-5 lg:p-0">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-primary">403</h1>
        <h2 className="text-xl font-medium">Acesso restrito!</h2>
        <p className="text-center opacity-75 lg:text-base">
          Você não tem permissões de administrador para acessar essa página.
        </p>
      </div>

      <Button onClick={() => router.push("/")}>Voltar para ínicio</Button>
    </div>
  );
};

export default DeniedPage;

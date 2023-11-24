import "../globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/providers/auth";
import { ToastContainer } from "react-toastify";
import Sidebar from "./dashboard/components/sidebar";
import Header from "./dashboard/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Aqui tem tudo que o seu setup precisa!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <div className="flex overflow-hidden">
                <ToastContainer theme="colored" />
                <Sidebar />
                <div className="flex w-full flex-col">
                  <Header />
                  {children}
                </div>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

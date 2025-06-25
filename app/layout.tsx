import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/ui/header";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clean Web Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${montserrat.className} bg-white text-black w-full min-h-screen`}
        >
        {children}
      </body>
    </html>
  );
}

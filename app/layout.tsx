import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/ui/header";
import "./globals.css";

const roboto = Roboto({
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
      <Header/>
      <body
        className={`${roboto.className} bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}

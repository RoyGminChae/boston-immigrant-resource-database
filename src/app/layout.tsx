import type { Metadata } from "next";
import { Open_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boston Immigrant Resource Database",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", openSans.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/app/globals.css";
import Header from "@/src/components/web/layout/Header";
import Footer from "@/src/components/web/layout/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MyApp",
    template: "%s | MyApp",
  },
  description: "A modern web platform for users and admins.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MyApp",
    description: "A modern web platform.",
    url: "https://myapp.com",
    siteName: "MyApp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

        <Header />
        {children}
        <Footer />
  
    </>
  );
}

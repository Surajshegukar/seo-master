import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "../context/providers/session-provider";
import "@/src/app/globals.css";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

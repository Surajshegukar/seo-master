import type { Metadata } from "next";
import { SessionProvider } from "../context/providers/session-provider";
import "@/src/app/globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
      <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

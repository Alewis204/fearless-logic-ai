import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fearless Logic AI | From Idea to Launch in Minutes",
  description:
    "All-in-one AI platform for entrepreneurs to build websites, apps, and businesses without coding.",
  openGraph: {
    title: "Fearless Logic AI — Your AI Co-Founder",
    description:
      "Build your online business in minutes. No code. No hassle.",
    url: "https://fearlesslogic.app",
    siteName: "Fearless Logic AI",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fearless Logic AI — Your AI Co-Founder",
    description:
      "Build your online business in minutes. No code. No hassle.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-full flex flex-col antialiased`}
      >
        {/* Skip-to-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-navy focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue/30"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

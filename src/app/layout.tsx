import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lyncs — Apply to every job that fits you, automatically",
  description:
    "An AI agent that watches 50,000+ career pages and submits applications across 12 ATSes — over web, iMessage, Chrome, and CLI. 25 free applications to start.",
  openGraph: {
    title: "Lyncs — Apply to every job that fits you, automatically",
    description:
      "An AI agent that watches 50,000+ career pages and submits applications across 12 ATSes — over web, iMessage, Chrome, and CLI.",
    type: "website",
    url: "https://lyncs.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyncs — Apply to every job that fits you, automatically",
    description:
      "An AI agent that watches 50,000+ career pages and submits applications across 12 ATSes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "Creative marketing, campaign thinking, visual design and photography by Yihan Jiang.";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Yihan Jiang | Creative Portfolio",
      template: "%s | Yihan Jiang",
    },
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Yihan Jiang | Creative Portfolio",
      description,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yihan Jiang | Creative Portfolio",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "";
  const isWindows = /Windows/i.test(userAgent);

  return (
    <html lang="en" data-platform={isWindows ? "windows" : undefined}>
      <body className={inter.variable}>
        <SmoothScroll disabled={isWindows} />
        {children}
      </body>
    </html>
  );
}

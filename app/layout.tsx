import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
Metadata for SEO Chevhin Porto
*/
export const metadata: Metadata = {
  title: "Chevhin Walidain Portfolio",
  description: "Portfolio of Chevhin Walidain",
  openGraph: {
    title: "Chevhin Walidain Portfolio",
    description: "Portfolio of Chevhin Walidain",
    url: "https://chevhin-walidain.netlify.app/",
    siteName: "Chevhin Walidain Portfolio",
    images: [
      {
        // url: "https://chevhin-walidain.netlify.app/og.png",
        url: "https://chevhin-walidain.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Chevhin Walidain Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chevhin Walidain Portfolio",
    description: "Portfolio of Chevhin Walidain",
    images: ["https://chevhin-walidain.netlify.app/og.png"],
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
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { config } from "@/app/lib/config";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: {
    default: config.site.name,
    template: `%s | ${config.site.name}`,
  },
  description: config.site.description,
  applicationName: config.site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: config.site.name,
    description: config.site.description,
    siteName: config.site.name,
    url: config.site.url,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.name,
    description: config.site.description,
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
      className={`${playfairDisplay.variable} ${sourceSans3.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to content
        </a>
        <div className="flex min-h-full flex-col">
          <Header />
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

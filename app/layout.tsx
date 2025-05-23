import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Urbanist } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

import Header from "../components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider"

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    openGraph: {
      images: [settings.data.og_image?.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body className={clsx(urbanist.className, "relative")}>
        
        <ThemeProvider defaultTheme="system">
         <script id="chatway" async src="https://cdn.chatway.app/widget.js?id=dEB2vdKKIwk1"></script>

         <Header />

         <main className="min-h-screen">
          {children}
         </main>

         <Footer />

        </ThemeProvider>
        <Analytics />

        <SpeedInsights />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

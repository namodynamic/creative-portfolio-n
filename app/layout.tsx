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
    <html lang="en" className="bg-black-100">
      <body className={clsx(urbanist.className, "relative")}>
        <div className="absolute right-0 top-0 z-10">
          <img src="/bg.png" alt="background" />
        </div>
        <div className="absolute left-0 max-md:hidden top-0 z-10">
          <img src="/bg.png" alt="background" />
        </div>
        <Header />

        <main className="min-h-screen">{children}</main>
        {/* <div className="background-gradient absolute inset-0 -z-50 max-h-screen" /> */}
        <Footer />

        <Analytics />

        <SpeedInsights />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";
import "@fontsource/sora";
import "@fontsource/ibm-plex-mono";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Joe Wilkinson - AI/ML Engineer & Full-Stack Builder",
  description: "Joe Wilkinson - Senior AI Software Engineer building custom ML systems and production software. Fine-tuned language models, predictive modeling, optimization, and full-stack delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";
import "@fontsource/sora";
import "@fontsource/ibm-plex-mono";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Joe Wilkinson - Full Stack Developer",
  description: "Personal portfolio of Joe Wilkinson - Full Stack Developer specializing in modern web technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

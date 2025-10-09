import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";
import "@fontsource/sora";
import "@fontsource/ibm-plex-mono";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Joe Wilkinson - Entrepreneurial Engineer",
  description: "Personal portfolio of Joe Wilkinson - Entrepreneurial Engineer specializing in bringing ideas to market.",
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

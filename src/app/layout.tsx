import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323"
});

export const metadata: Metadata = {
  title: "CORDOVA's GALLERY",
  description: "Cordova's portfolio site featuring digital art and creative projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vt323.variable} suppressHydrationWarning>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}

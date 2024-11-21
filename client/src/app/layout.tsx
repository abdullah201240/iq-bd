import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from 'next/dynamic';
const NavBar = dynamic(() => import('@/components/Nabvar')); // Corrected typo in component name

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IQ Architects",
  description: "Discover With Bangladesh's Best Architecture Firm IQ ARCHITECTS LTD for innovative architecture and stunning landscape design. Explore our expertise in planning, decoration, interior, exterior and building design for your dream space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <NavBar />
       
        {children}
      </body>
    </html>
  );
}

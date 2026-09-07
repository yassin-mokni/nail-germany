import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nail Germany // Expat Bureaucratic Self-Defense Protocol",
  description:
    "A brutalist, utilitarian client-side guide for expats navigating German bureaucracy without getting exploited by landlords, employers, or the state.",
  authors: [{ name: "Nail Germany Protocol" }],
  keywords: [
    "Germany expat",
    "German bureaucracy",
    "Anmeldung",
    "Mietkaution",
    "Mieterverein",
    "Rundfunkbeitrag",
    "Kindergeld",
    "Aufenthaltstitel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-black">
      <body className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}

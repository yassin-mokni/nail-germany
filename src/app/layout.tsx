import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nail-germany.mokni.dev"),
  title: "Nail Germany | German Bureaucracy Checklist",
  description:
    "A clear, practical guide for expats moving to and living in Germany. Stay on top of your Anmeldung, rental rights, health insurance, and taxes. Built by Yassin.",
  authors: [{ name: "Yassin", url: "https://mokni.dev" }],
  creator: "Yassin",
  alternates: {
    canonical: "https://nail-germany.mokni.dev",
  },
  openGraph: {
    title: "Nail Germany | German Bureaucracy Checklist",
    description:
      "A clear, practical guide for expats moving to and living in Germany. Stay on top of your Anmeldung, rental rights, health insurance, and taxes.",
    url: "https://nail-germany.mokni.dev",
    siteName: "Nail Germany",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nail Germany | German Bureaucracy Checklist",
    description:
      "A clear, practical guide for expats moving to and living in Germany. Stay on top of your Anmeldung, rental rights, health insurance, and taxes.",
  },
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

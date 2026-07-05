import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "CalmSpace – Mental Health Support",
  description: "Connect with experienced mental health counselors and explore resources for your well-being.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer style={{ background: '#1a2e1f', color: '#aec9b3' }} className="py-10 text-center text-sm">
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>CalmSpace</p>
          <p>© {new Date().getFullYear()} CalmSpace. All rights reserved. Mental health support you can trust.</p>
        </footer>
      </body>
    </html>
  );
}

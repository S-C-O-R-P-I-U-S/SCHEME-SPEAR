import type { Metadata } from 'next';
import './globals.css';
import Preloader from '@/components/ui/Preloader';

export const metadata: Metadata = {
  title: 'SCHEME SPEAR | AI-Powered Government Welfare Scheme Discovery & Direct Application Portal',
  description: 'AI-Driven Scheme Matching & Financial Inclusion for Marginalized Entrepreneurs across India.',
  keywords: 'SCHEME SPEAR, AI Scheme Matching, NSFDC, Welfare Schemes, Financial Inclusion, Government Schemes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0A0E1A] text-slate-100 font-sans antialiased selection:bg-[#FFB800] selection:text-black">
        <Preloader />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PawCal — Evcil Hayvan Sağlık Takibi',
    template: '%s | PawCal',
  },
  description:
    'Evcil hayvanınızın beslenme, sağlık ve aktivitesini takip edin. PawCal ile veri odaklı evcil hayvan bakımı.',
  metadataBase: new URL('https://pawcal.net'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://pawcal.net',
    siteName: 'PawCal',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Montserrat } from 'next/font/google';

import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://activosporcolombia.com'),
  title: "MLS | Red Inmobiliaria MLS en Colombia",
  description:
    "Bienvenido a La Lonja, la MLS que impulsa el corretaje profesional en Colombia. Únete a la red de brokers más grande del país y accede a tecnología, confianza y negocios compartidos.",
  openGraph: {
    title: "LA LONJA ACTIVOS POR COLOMBIA",
    description:
      "Conectamos oportunidades inmobiliarias en toda Colombia. Seguridad, profesionalismo y cobertura nacional con la MLS de confianza: La Lonja.",
    url: "/image/banner/MujerRayas-banner.webp",
    siteName: "LA LONJA ACTIVOS POR COLOMBIA",
    images: [
      {
        url: "/image/banner/MujerRayas-banner.webp",
        width: 1200,
        height: 630,
        alt: "MLS Activos por Colombia - Red Inmobiliaria",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className={`${poppins.className}`}>
          {children}
      </body>
    </html>
  );
}

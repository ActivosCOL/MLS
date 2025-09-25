import { Poppins } from 'next/font/google';

import "./../globals.css";
import PrincipalLayout from "@/components/layout/PrincipalLayout";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={poppins.className}>
            <body>
                <PrincipalLayout>
                    {children}
                </PrincipalLayout>
            </body>
        </html>
    );
}

import { Poppins } from 'next/font/google';
import "./../globals.css";
import SecondaryLayout from "@/components/layout/SecondaryLayout";


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
                <SecondaryLayout>
                    {children}
                </SecondaryLayout>
            </body>
        </html>
    );
}

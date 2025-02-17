import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const poppinsFont = localFont({
  src: [
    {
      path: './fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
});
const courierFont = localFont({
  src: [
    {
      path: './fonts/CourierPrime-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CourierPrime-Bold.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-courier',
});

const inter = localFont({
  src: [
    { path: './fonts/Inter_18pt-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eventcage - Seamlessly browse spaces',
  description: 'Seamlessly browse spaces',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courierFont.variable} ${poppinsFont.variable} ${inter.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;

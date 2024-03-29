import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ireland Tides',
  description: 'Tide Times Around Ireland'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// import { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Head from 'next/head'; // Import Head component
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Ireland Tides',
//   description: 'Tide Times Around Ireland',
//   // Add favicon path
//   favicon: '/favicon.ico',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang='en'>
//       {/* Add Head component to include favicon, title, and description */}
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         <link rel="icon" href={metadata.favicon} />
//       </Head>
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
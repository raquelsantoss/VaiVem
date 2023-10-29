import type { Metadata } from 'next'
import './globals.css'
import LayoutProvider from '@/providers/LayoutProvider'
import StoreProvider from "@/providers/StoreProvider";
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: 'VaiVem',
  description: 'A modern rent e-commerce application build in Next.js and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

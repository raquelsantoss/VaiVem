import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'VaiVem',
  description: 'A modern rent e-commerce application build in Next.js and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

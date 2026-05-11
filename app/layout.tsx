import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/ui/Nav'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Cursor from '@/components/ui/Cursor'
import SectionDots from '@/components/ui/SectionDots'

export const metadata: Metadata = {
  title: 'Void Gallery — Art for the Dark',
  description:
    'An institution for artists who refuse the light. Void Gallery presents work that exists at the edge of perception.',
  openGraph: {
    title: 'Void Gallery',
    description: 'Where dark art lives. Since 1997.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Cursor />
          <Nav />
          <SectionDots />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

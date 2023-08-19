import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import 'ress'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
const clerkKey: string = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang='en'>
        <body className={inter.className}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}

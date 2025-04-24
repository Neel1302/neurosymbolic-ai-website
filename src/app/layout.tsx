import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: 'Neurosymbolic Intelligence | Bridging Neural and Symbolic AI',
  description: 'Pioneering the future of AI through the integration of neural networks and symbolic reasoning systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-neural-dark text-white min-h-screen">
        {children}
      </body>
    </html>
  )
} 
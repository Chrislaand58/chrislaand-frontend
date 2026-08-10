import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/lib/wallet-context'

export const metadata: Metadata = {
  title: 'Drips Wave - Real-Time Streaming on Stellar',
  description: 'Continuous streaming interface that calculates real-time unlocked balance down to milliseconds using client-side interpolation.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌊</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}

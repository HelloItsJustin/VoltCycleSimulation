import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VoltCycle Digital Twin | AI-Powered Battery Lifecycle Management',
  description: 'Interactive Digital Twin MVP showcasing advanced battery recycling, grading, and reflow assembly with real-time metrics and compliance tracking.',
  keywords: 'battery recycling, digital twin, energy storage, lithium-ion, VoltCycle',
  openGraph: {
    title: 'VoltCycle Digital Twin',
    description: 'Industrial Cyber-Command Interface for Battery Lifecycle Management',
    url: 'https://voltcycle.digital',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-cyber-darker">
        {children}
      </body>
    </html>
  )
}

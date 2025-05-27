import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WANDERWAY - Virtual World Tours",
  description:
    "Experience the world's most beautiful destinations from the comfort of your home. Virtual tours that bring global wonders to your screen.",
  keywords: "virtual tours, travel, destinations, world attractions, online tourism",
  authors: [{ name: "WANDERWAY Team" }],
  openGraph: {
    title: "WANDERWAY - Virtual World Tours",
    description: "Experience the world from home with immersive virtual tours",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

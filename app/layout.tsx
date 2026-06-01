import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ROHIT TOURS & TRAVELS | Premium Car Rentals',
  description: 'Book premium cars for your journey. ROHIT TOURS & TRAVELS offers luxury, SUV, and economy car rentals with the best rates.',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
        <FooterSection />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}


import { Inter, Playfair_Display } from "next/font/google"
import HeaderNav from "@/components/Hero2/Navbar"
// ChatBot imports

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata = {
  title: "AarogyaWellness: Home Remedies & Healthcare Insights",
  description: "Your trusted space for home remedies, healthcare insights, and modern wellness solutions.",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <HeaderNav />
        {children}
      </body>
    </html>
  )
}

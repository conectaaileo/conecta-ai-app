import { Inter } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/Navbar"
import ThemeProvider from "./components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

// Tipagem correta do Metadata do Next.js
export const metadata: Metadata = { 
  title: "conectaAI", 
  description: "Alugue em 5 minutos" 
}

// Tipagem correta do children
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
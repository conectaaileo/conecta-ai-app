import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import ThemeProvider from "./components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = { title: "conectaAI", description: "Alugue em 5 minutos" }

export default function RootLayout({ children }) {
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

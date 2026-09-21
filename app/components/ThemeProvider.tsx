"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react"

// 1. Definindo os tipos para o Tema
type Theme = "light" | "dark"

// 2. Definindo o formato do Contexto
interface ThemeContextType {
  tema: Theme
  setTema: (tema: Theme) => void
  modo: string
  setModo: (modo: string) => void
}

// 3. Criando o Contexto com valor inicial
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 4. O Provider propriamente dito (com a tipagem correta do 'children')
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [modo, setModo] = useState("temtudo")
  const [tema, setTema] = useState<Theme>("light")

  useEffect(() => {
    // Lógica para aplicar o tema no HTML (exemplo básico)
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(tema)
  }, [tema])

  return (
    <ThemeContext.Provider value={{ tema, setTema, modo, setModo }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 5. Hook personalizado para usar o tema (opcional, mas boa prática)
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
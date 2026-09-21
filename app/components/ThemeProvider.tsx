"use client"
import { useState, useEffect } from "react"

export default function ThemeProvider({ children }) {
  const [modo, setModo] = useState("temtudo")
  const [tema, setTema] = useState("light")

  useEffect(() => {
    const modoSalvo = localStorage.getItem("modoUsuario") || "temtudo"
    setModo(modoSalvo)
    setTema(modoSalvo === "vizinho" ? "dark" : "light")
  }, [])

  useEffect(() => {
    const handleStorage = () => {
      const novoModo = localStorage.getItem("modoUsuario") || "temtudo"
      setModo(novoModo)
      setTema(novoModo === "vizinho" ? "dark" : "light")
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    if (tema === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [tema])

  return (
    <div className={tema === "dark" ? "dark" : ""}>
      <div className={tema === "dark" ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-gray-900"}>
        {children}
      </div>
    </div>
  )
}

"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [modo, setModo] = useState("temtudo")

  useEffect(() => {
    const salvo = localStorage.getItem("modoUsuario")
    if (salvo) setModo(salvo)
  }, [])

  const alternar = () => {
    const novo = modo === "temtudo" ? "vizinho" : "temtudo"
    setModo(novo)
    localStorage.setItem("modoUsuario", novo)
    window.dispatchEvent(new Event("storage"))
  }

  const isDark = modo === "vizinho"

  return (
    <nav className={`border-b p-4 sticky top-0 z-50 shadow-sm ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
            conecta<span className="text-emerald-500">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            {modo === "vizinho" ? (
              <>
                <Link href="/explorar" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Explorar</Link>
                <Link href="/mensagens" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Mensagens</Link>
                <Link href="/meus-alugueis" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Meus Aluguéis</Link>
              </>
            ) : (
              <>
                <Link href="/meus-itens" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Meus Itens</Link>
                <Link href="/solicitacoes" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Solicitações</Link>
                <Link href="/ganhos" className={`px-3 py-2 rounded ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>Ganhos</Link>
              </>
            )}
            <Link href="/perfil" className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white">JS</div>
              <span className={`font-medium hidden md:block ${isDark ? "text-white" : "text-gray-900"}`}>João Silva</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-3" style={{borderColor: isDark ? "#374151" : "#e5e7eb"}}>
          <button onClick={alternar} className={`px-4 py-2 rounded-lg font-medium text-white transition ${modo === "vizinho" ? "bg-gray-700 hover:bg-gray-600" : "bg-emerald-700 hover:bg-emerald-800"}`}>
            {modo === "vizinho" ? " Vizinho" : "💼 Tem Tudo"}
          </button>
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>conectaAI © 2024</span>
        </div>
      </div>
    </nav>
  )
}


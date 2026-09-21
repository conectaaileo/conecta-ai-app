"use client"
import { useState } from "react"

// 1. Definimos o formato exato de uma solicitação
interface Solicitacao {
  id: number
  usuario: string
  item: string
  datas: string
  valor: string
  avatar: string
}

export default function Solicitacoes() {
  // 2. Aplicamos a interface ao useState
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    { id: 1, usuario: "Maria Souza", item: "Furadeira Bosch", datas: "10/01 a 12/01", valor: "R$ 50", avatar: "MS" },
    { id: 2, usuario: "Carlos Lima", item: "Câmera Canon", datas: "15/01 a 18/01", valor: "R$ 150", avatar: "CL" },
  ])

  // 3. Tipamos os parâmetros da função (id é número, acao é texto)
  const handleAcao = (id: number, acao: string) => {
    setSolicitacoes(solicitacoes.filter(s => s.id !== id))
    alert(`Solicitação ${acao === 'aceitar' ? 'aprovada' : 'recusada'} com sucesso!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitações de Aluguel</h1>
        <p className="text-gray-600 mb-6">Você tem {solicitacoes.length} pedidos pendentes.</p>

        {solicitacoes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-gray-600">Nenhuma solicitação pendente no momento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitacoes.map(sol => (
              <div key={sol.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                      {sol.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{sol.usuario}</h3>
                      <p className="text-sm text-gray-600">Quer alugar: <span className="font-medium text-emerald-700">{sol.item}</span></p>
                      <p className="text-sm text-gray-500 mt-1">📅 {sol.datas}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-700">{sol.valor}</p>
                    <p className="text-xs text-gray-500 mb-3">Total do aluguel</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleAcao(sol.id, 'recusar')} className="px-3 py-2 border border-red-300 text-red-700 rounded-lg text-sm hover:bg-red-50">
                        Recusar
                      </button>
                      <button onClick={() => handleAcao(sol.id, 'aceitar')} className="px-3 py-2 bg-emerald-700 text-white rounded-lg text-sm hover:bg-emerald-800">
                        Aceitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
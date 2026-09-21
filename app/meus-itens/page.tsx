"use client"
import Link from "next/link"

export default function MeusItens() {
  const itens = [
    { id: 1, nome: "Furadeira Bosch", preco: "R$ 25/dia", status: "Alugado", ganho: "R$ 150", cor: "bg-yellow-100 text-yellow-800" },
    { id: 2, nome: "Mesa de Centro", preco: "R$ 15/dia", status: "Disponível", ganho: "R$ 0", cor: "bg-emerald-100 text-emerald-800" },
    { id: 3, nome: "Câmera Canon", preco: "R$ 50/dia", status: "Pausado", ganho: "R$ 200", cor: "bg-gray-100 text-gray-800" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Itens</h1>
            <p className="text-gray-600">Gerencie seus anúncios e acompanhe seus ganhos.</p>
          </div>
          <Link href="/cadastrar-item" className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium">
            + Cadastrar Novo Item
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <p className="text-sm text-gray-600">Total de Itens</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <p className="text-sm text-gray-600">Alugados Agora</p>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <p className="text-sm text-gray-600">Faturamento Total</p>
            <p className="text-3xl font-bold text-emerald-700">R$ 350</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-900">Lista de Itens Cadastrados</h2>
          </div>
          <div className="divide-y">
            {itens.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-bold text-gray-900">{item.nome}</h3>
                  <p className="text-sm text-gray-600">{item.preco}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.cor}`}>{item.status}</span>
                  <p className="text-sm text-emerald-700 font-bold mt-1">Ganho: {item.ganho}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

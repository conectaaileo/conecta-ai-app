"use client"
import { useState } from "react"

export default function Ganhos() {
  const [filtroPeriodo, setFiltroPeriodo] = useState("mes")

  const resumo = {
    saldoDisponivel: 1250,
    faturamentoMes: 850,
    faturamentoTotal: 3500,
    pendenteReceber: 300,
  }

  const transacoes = [
    { id: 1, item: "Furadeira Bosch", locatario: "Maria Souza", valor: 125, status: "recebido", data: "15/01/2025" },
    { id: 2, item: "Mesa de Centro", locatario: "Carlos Lima", valor: 75, status: "recebido", data: "10/01/2025" },
    { id: 3, item: "Câmera Canon", locatario: "Ana Paula", valor: 200, status: "pendente", data: "18/01/2025" },
    { id: 4, item: "Bicicleta Mountain", locatario: "Pedro Santos", valor: 90, status: "recebido", data: "05/01/2025" },
    { id: 5, item: "Lixadeira de Parede", locatario: "Julia Costa", valor: 175, status: "pendente", data: "20/01/2025" },
  ]

  const transacoesFiltradas = filtroPeriodo === "mes" 
    ? transacoes.filter(t => t.data.includes("01/2025"))
    : transacoes

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ganhos</h1>
          <p className="text-gray-600">Acompanhe seu faturamento e saldo disponível.</p>
        </div>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl text-white shadow-lg">
            <p className="text-sm text-emerald-100 mb-1">Saldo Disponível</p>
            <p className="text-3xl font-bold">R$ {resumo.saldoDisponivel}</p>
            <button className="mt-3 px-4 py-2 bg-white text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50">
              Solicitar Saque
            </button>
          </div>
          <div className="p-6 bg-white rounded-xl border-2 border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Faturamento do Mês</p>
            <p className="text-3xl font-bold text-blue-700">R$ {resumo.faturamentoMes}</p>
          </div>
          <div className="p-6 bg-white rounded-xl border-2 border-purple-200">
            <p className="text-sm text-purple-700 mb-1">Faturamento Total</p>
            <p className="text-3xl font-bold text-purple-700">R$ {resumo.faturamentoTotal}</p>
          </div>
          <div className="p-6 bg-white rounded-xl border-2 border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Pendente a Receber</p>
            <p className="text-3xl font-bold text-orange-700">R$ {resumo.pendenteReceber}</p>
          </div>
        </div>

        {/* FILTRO DE PERÍODO */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setFiltroPeriodo("mes")}
              className={`px-4 py-2 rounded-lg font-medium transition ${filtroPeriodo === "mes" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Este Mês
            </button>
            <button 
              onClick={() => setFiltroPeriodo("todos")}
              className={`px-4 py-2 rounded-lg font-medium transition ${filtroPeriodo === "todos" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Todo o Período
            </button>
          </div>
        </div>

        {/* HISTÓRICO DE TRANSAÇÕES */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-900">Histórico de Transações</h2>
          </div>
          <div className="divide-y">
            {transacoesFiltradas.map(transacao => (
              <div key={transacao.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                    
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{transacao.item}</h3>
                    <p className="text-sm text-gray-600">Locatário: {transacao.locatario}</p>
                    <p className="text-xs text-gray-500">{transacao.data}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-700">R$ {transacao.valor}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                    transacao.status === "recebido" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {transacao.status === "recebido" ? "✓ Recebido" : "⏳ Pendente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INFORMAÇÕES IMPORTANTES */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ Informações sobre Pagamentos</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• O saldo fica disponível 48h após a devolução do item</li>
            <li>• Saques são processados em até 3 dias úteis</li>
            <li>• Taxa da plataforma: 10% sobre cada transação</li>
            <li>• Em caso de dano ao item, o valor da caução será retido</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

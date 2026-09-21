"use client"
import { useState } from "react"

const mockAlugueis = [
  { 
    id: 1, 
    item: "Furadeira Bosch Profissional 500W", 
    fotos: ["🔧", "", "📷"],
    local: "Vila Madalena, SP", 
    dataInicio: "2025-01-10", 
    dataFim: "2025-01-15", 
    status: "ativo", 
    valor: 250,
    locador: "João Silva",
    locatario: "Maria Souza",
    contratoAssinado: true,
    termos: "Item deve ser devolvido em perfeitas condições. Caução: R$ 100"
  },
  { 
    id: 2, 
    item: "Mesa de Centro de Madeira", 
    fotos: ["🪑", "📷", "📷"],
    local: "Pinheiros, SP", 
    dataInicio: "2024-12-20", 
    dataFim: "2024-12-25", 
    status: "concluido", 
    valor: 150,
    locador: "João Silva",
    locatario: "Carlos Lima",
    contratoAssinado: true,
    termos: "Móvel deve ser devolvido sem danos. Caução: R$ 50"
  },
  { 
    id: 3, 
    item: "Câmera Canon EOS", 
    fotos: ["", "📷", "📷"],
    local: "Jardins, SP", 
    dataInicio: "2024-11-05", 
    dataFim: "2024-11-08", 
    status: "concluido", 
    valor: 450,
    locador: "João Silva",
    locatario: "Ana Paula",
    contratoAssinado: false,
    termos: "Equipamento sensível. Manuseio cuidadoso. Caução: R$ 200"
  },
]

export default function MeusAlugueis() {
  const [filtro, setFiltro] = useState("todos")
  const [expandido, setExpandido] = useState(null)
  const [assinaturas, setAssinaturas] = useState({})

  const alugueisAtivos = mockAlugueis.filter(a => a.status === "ativo").length
  const alugueisConcluidos = mockAlugueis.filter(a => a.status === "concluido").length
  const alugueisFiltrados = filtro === "todos" ? mockAlugueis : mockAlugueis.filter(a => a.status === filtro)

  const toggleExpandido = (id) => {
    setExpandido(expandido === id ? null : id)
  }

  const assinarContrato = (id) => {
    setAssinaturas({...assinaturas, [id]: true})
    alert("✅ Contrato assinado com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Aluguéis</h1>
          <p className="text-gray-600">Gerencie seus aluguéis e acompanhe seu histórico.</p>
        </div>

        {/* CARDS RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Aluguéis Realizados</p>
            <p className="text-3xl font-bold text-blue-700">12</p>
          </div>
          <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
            <p className="text-sm text-green-700 mb-1">Avaliação</p>
            <p className="text-3xl font-bold text-green-700">4.9</p>
          </div>
          <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200">
            <p className="text-sm text-purple-700 mb-1">Aluguéis Ativos</p>
            <p className="text-3xl font-bold text-purple-700">3</p>
          </div>
        </div>

        {/* FILTROS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["todos", "ativo", "concluido"].map((f) => (
              <button key={f} onClick={() => setFiltro(f)} className={`px-4 py-2 rounded-lg font-medium transition ${filtro === f ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {f === "todos" ? `Todos (${mockAlugueis.length})` : f === "ativo" ? `Ativos (${alugueisAtivos})` : `Concluídos (${alugueisConcluidos})`}
              </button>
            ))}
          </div>
        </div>

        {/* LISTA DE ALUGUÉIS COM CONTRATO */}
        <div className="space-y-4">
          {alugueisFiltrados.map(aluguel => {
            const estaExpandido = expandido === aluguel.id
            const estaAssinado = assinaturas[aluguel.id] || aluguel.contratoAssinado
            
            return (
              <div key={aluguel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* CABEÇALHO DO CARD (sempre visível) */}
                <div 
                  onClick={() => toggleExpandido(aluguel.id)}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{aluguel.fotos[0]}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{aluguel.item}</h3>
                        <p className="text-sm text-gray-500 mt-1">📍 {aluguel.local}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>📅 {new Date(aluguel.dataInicio).toLocaleDateString("pt-BR")}</span>
                          <span>→</span>
                          <span>{new Date(aluguel.dataFim).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${aluguel.status === "ativo" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {aluguel.status === "ativo" ? "Ativo" : "Concluído"}
                      </span>
                      <p className="text-2xl font-bold text-emerald-700 mt-2">R$ {aluguel.valor}</p>
                      <button className="text-xs text-emerald-700 mt-1 underline">
                        {estaExpandido ? "▲ Ocultar detalhes" : "▶ Ver contrato"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CONTEÚDO EXPANDÍVEL (contrato e fotos) */}
                {estaExpandido && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    
                    {/* GALERIA DE FOTOS */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3"> Fotos do Item</h4>
                      <div className="flex gap-3">
                        {aluguel.fotos.map((foto, idx) => (
                          <div key={idx} className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl hover:border-emerald-500 transition cursor-pointer">
                            {foto}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CONTRATO */}
                    <div className="bg-white rounded-lg border-2 border-emerald-200 p-6 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 text-lg">📄 Contrato de Aluguel</h4>
                        {estaAssinado ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            ✅ Assinado
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            ⏳ Pendente
                          </span>
                        )}
                      </div>

                      <div className="space-y-3 text-sm text-gray-700 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600"><strong>Locador:</strong> {aluguel.locador}</p>
                            <p className="text-gray-600"><strong>Locatário:</strong> {aluguel.locatario}</p>
                          </div>
                          <div>
                            <p className="text-gray-600"><strong>Período:</strong> {new Date(aluguel.dataInicio).toLocaleDateString("pt-BR")} a {new Date(aluguel.dataFim).toLocaleDateString("pt-BR")}</p>
                            <p className="text-gray-600"><strong>Valor Total:</strong> R$ {aluguel.valor},00</p>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-600"><strong>Termos:</strong> {aluguel.termos}</p>
                        </div>
                      </div>

                      {/* BOTÃO DE ASSINATURA */}
                      {!estaAssinado && aluguel.status === "ativo" && (
                        <button 
                          onClick={() => assinarContrato(aluguel.id)}
                          className="w-full px-4 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 flex items-center justify-center gap-2"
                        >
                          ✍️ Assinar Contrato Digitalmente
                        </button>
                      )}
                    </div>

                    {/* AÇÕES */}
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white">
                        💬 Enviar Mensagem
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white">
                        ️ Imprimir Contrato
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {alugueisFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-gray-600">Nenhum aluguel encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

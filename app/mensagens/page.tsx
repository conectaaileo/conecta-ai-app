"use client"
import { useState } from "react"

export default function Mensagens() {
  const [conversaAtiva, setConversaAtiva] = useState(1)
  const [mostrarContrato, setMostrarContrato] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const [assinado, setAssinado] = useState(false)

  const conversas = [
    { id: 1, nome: "Maria Souza", item: "Furadeira Bosch", ultimaMsg: "Podemos combinar a retirada amanhã?", hora: "10:30", naoLidas: 2, avatar: "MS" },
    { id: 2, nome: "Carlos Lima", item: "Mesa de Centro", ultimaMsg: "Obrigado pelo aluguel!", hora: "Ontem", naoLidas: 0, avatar: "CL" },
    { id: 3, nome: "Ana Paula", item: "Câmera Canon", ultimaMsg: "Qual o estado do equipamento?", hora: "Ontem", naoLidas: 1, avatar: "AP" },
  ]

  const mensagens = [
    { id: 1, remetente: "Maria Souza", texto: "Olá! Tenho interesse na furadeira Bosch.", hora: "10:25", tipo: "recebida" },
    { id: 2, remetente: "Você", texto: "Olá Maria! Ela está disponível sim. Quando você precisa?", hora: "10:27", tipo: "enviada" },
    { id: 3, remetente: "Maria Souza", texto: "Preciso para o próximo final de semana. Qual o valor?", hora: "10:28", tipo: "recebida" },
    { id: 4, remetente: "Você", texto: "R$ 25/dia. Para 2 dias fica R$ 50 + R$ 100 de caução.", hora: "10:29", tipo: "enviada" },
    { id: 5, remetente: "Maria Souza", texto: "Podemos combinar a retirada amanhã?", hora: "10:30", tipo: "recebida" },
  ]

  const enviarMensagem = (e) => {
    e.preventDefault()
    if (mensagem.trim()) {
      setMensagem("")
      alert("Mensagem enviada! (simulação)")
    }
  }

  const enviarContrato = () => {
    setMostrarContrato(true)
  }

  const assinarContrato = () => {
    setAssinado(true)
    setMostrarContrato(false)
    alert("✅ Contrato assinado e enviado no chat!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mensagens</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LISTA DE CONVERSAS */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-900">Conversas</h2>
            </div>
            <div className="divide-y">
              {conversas.map(conv => (
                <div 
                  key={conv.id} 
                  onClick={() => setConversaAtiva(conv.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${conversaAtiva === conv.id ? "bg-emerald-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 flex-shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 truncate">{conv.nome}</h3>
                        <span className="text-xs text-gray-500">{conv.hora}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">{conv.item}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{conv.ultimaMsg}</p>
                    </div>
                    {conv.naoLidas > 0 && (
                      <span className="bg-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {conv.naoLidas}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHAT */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col" style={{height: "600px"}}>
            
            {/* CABEÇALHO DO CHAT */}
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                  MS
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Maria Souza</h3>
                  <p className="text-xs text-gray-600">Aluguel: Furadeira Bosch</p>
                </div>
              </div>
              <button 
                onClick={enviarContrato}
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-sm font-medium flex items-center gap-2"
              >
                 Enviar Contrato
              </button>
            </div>

            {/* MENSAGENS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mensagens.map(msg => (
                <div key={msg.id} className={`flex ${msg.tipo === "enviada" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.tipo === "enviada" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-900"}`}>
                    <p className="text-sm">{msg.texto}</p>
                    <p className={`text-xs mt-1 ${msg.tipo === "enviada" ? "text-emerald-100" : "text-gray-500"}`}>{msg.hora}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT DE MENSAGEM */}
            <form onSubmit={enviarMensagem} className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <button type="submit" className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL DO CONTRATO */}
      {mostrarContrato && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* CABEÇALHO */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">📄 Contrato de Aluguel</h2>
                <button onClick={() => setMostrarContrato(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
            </div>

            {/* CONTEÚDO DO CONTRATO */}
            <div className="p-6 space-y-6">
              
              {/* DADOS BÁSICOS */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600"><strong>Locador:</strong> João Silva</p>
                    <p className="text-gray-600"><strong>Locatário:</strong> Maria Souza</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Item:</strong> Furadeira Bosch Profissional</p>
                    <p className="text-gray-600"><strong>Período:</strong> 10/01/2025 a 15/01/2025</p>
                    <p className="text-gray-600"><strong>Valor:</strong> R$ 125,00 + R$ 100,00 (caução)</p>
                  </div>
                </div>
              </div>

              {/* CLÁUSULAS IMPORTANTES */}
              <div className="border-2 border-red-200 bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  ⚠️ CLÁUSULAS IMPORTANTES
                </h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span><strong>A plataforma conectaAI NÃO atua como intermediadora</strong> da transação. O contrato é firmado diretamente entre LOCADOR e LOCATÁRIO.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span><strong>A plataforma NÃO se responsabiliza</strong> por danos, avarias, riscos, perda, roubo ou extravio do item alugado. A responsabilidade é integralmente do LOCATÁRIO.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>O LOCATÁRIO declara ter vistoriado o item e estar ciente de seu estado de conservação antes do recebimento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Em caso de dano ou perda, o LOCATÁRIO deverá ressarcir o LOCADOR integralmente pelo valor do item.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">5.</span>
                    <span>O atraso na devolução acarretará multa de 10% por dia de atraso sobre o valor total do aluguel.</span>
                  </li>
                </ul>
              </div>

              {/* TERMOS GERAIS */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Termos Gerais:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• O item deverá ser devolvido nas mesmas condições de recebimento (exceto desgaste natural)</li>
                  <li>• É proibido o sublocação ou transferência do item a terceiros</li>
                  <li>• O LOCADOR se responsabiliza pelo funcionamento adequado do equipamento no momento da entrega</li>
                  <li>• A caução será devolvida em até 48h após a devolução do item em perfeitas condições</li>
                </ul>
              </div>

              {/* CHECKBOX */}
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input type="checkbox" id="ciente" className="mt-1 w-4 h-4" />
                <label htmlFor="ciente" className="text-sm text-gray-800">
                  <strong>Declaro que li e concordo com todas as cláusulas acima,</strong> especialmente sobre a não-intermediação da plataforma e minha responsabilidade integral sobre o item alugado.
                </label>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="p-6 border-t flex gap-3">
              <button onClick={() => setMostrarContrato(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Cancelar
              </button>
              <button onClick={assinarContrato} className="flex-1 px-4 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">
                ✅ Assinar e Enviar no Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

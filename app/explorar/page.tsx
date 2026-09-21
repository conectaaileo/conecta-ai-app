"use client"
import { useState, useEffect } from "react"

// 1. Definimos a estrutura do Item para o TypeScript entender
interface Item {
  id: number
  nome: string
  preco: string
  local: string
  categoria: string
  parceira: string
}

export default function Explorar() {
  // 2. Tipamos a localização: pode ser null no início, ou um objeto com lat e lng
  const [localizacao, setLocalizacao] = useState<{ lat: number; lng: number } | null>(null)
  const [carregando, setCarregando] = useState<boolean>(false)
  const [busca, setBusca] = useState<string>("")
  const [localBusca, setLocalBusca] = useState<string>("")
  
  // 3. Tipamos o array para aceitar apenas objetos do tipo Item
  const [itensFiltrados, setItensFiltrados] = useState<Item[]>([])

  const empresasParceiras = [
    { nome: "Quinto Andar", cor: "bg-blue-100 text-blue-800" },
    { nome: "Cirela", cor: "bg-green-100 text-green-800" },
    { nome: "QwenAI", cor: "bg-purple-100 text-purple-800" },
    { nome: "ToolShare", cor: "bg-orange-100 text-orange-800" },
    { nome: "AlugaFácil", cor: "bg-pink-100 text-pink-800" },
  ]

  const itensMock: Item[] = [
    { id: 1, nome: "Furadeira Bosch", preco: "R$ 25/dia", local: "Vila Madalena", categoria: "Ferramentas", parceira: "ToolShare" },
    { id: 2, nome: "Mesa de Centro", preco: "R$ 15/dia", local: "Pinheiros", categoria: "Móveis", parceira: "Quinto Andar" },
    { id: 3, nome: "Câmera Canon", preco: "R$ 50/dia", local: "Jardins", categoria: "Eletrônicos", parceira: "QwenAI" },
    { id: 4, nome: "Bicicleta Mountain", preco: "R$ 30/dia", local: "Pinheiros", categoria: "Esportes", parceira: "Cirela" },
    { id: 5, nome: "Lixadeira de Parede", preco: "R$ 35/dia", local: "Vila Madalena", categoria: "Ferramentas", parceira: "ToolShare" },
    { id: 6, nome: "Sofá 3 Lugares", preco: "R$ 40/dia", local: "Moema", categoria: "Móveis", parceira: "Quinto Andar" },
    { id: 7, nome: "Notebook Dell", preco: "R$ 60/dia", local: "Pinheiros", categoria: "Eletrônicos", parceira: "QwenAI" },
    { id: 8, nome: "Furadeira Impacto", preco: "R$ 30/dia", local: "Jardins", categoria: "Ferramentas", parceira: "AlugaFácil" },
  ]

  const obterLocalizacao = () => {
    setCarregando(true)
    if (!navigator.geolocation) {
      setCarregando(false)
      return
    }
    // 4. Tipamos o parâmetro da geolocalização
    navigator.geolocation.getCurrentPosition(
      (posicao: GeolocationPosition) => {
        setLocalizacao({
          lat: posicao.coords.latitude,
          lng: posicao.coords.longitude
        })
        setCarregando(false)
      },
      () => setCarregando(false)
    )
  }

  const buscarItens = () => {
    let filtrados = itensMock

    if (busca.trim()) {
      const termo = busca.toLowerCase()
      filtrados = filtrados.filter(item => 
        item.nome.toLowerCase().includes(termo) ||
        item.categoria.toLowerCase().includes(termo)
      )
    }

    if (localBusca.trim()) {
      const local = localBusca.toLowerCase()
      filtrados = filtrados.filter(item => 
        item.local.toLowerCase().includes(local)
      )
    }

    setItensFiltrados(filtrados)
  }

  useEffect(() => {
    obterLocalizacao()
    setItensFiltrados(itensMock)
  }, [])

  // 5. Tipamos o parâmetro 'nome' como string
  const getParceiraCor = (nome: string) => {
    const parceira = empresasParceiras.find(p => p.nome === nome)
    return parceira ? parceira.cor : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar</h1>
              <p className="text-gray-600">Descubra itens disponíveis perto de você</p>
            </div>
            <button 
              onClick={obterLocalizacao}
              disabled={carregando}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 disabled:opacity-50"
            >
              {carregando ? "📍 Localizando..." : "📍 Minha Localização"}
            </button>
          </div>

          {localizacao && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-emerald-700 font-medium">📍 Localização detectada</p>
              <p className="text-sm text-emerald-600">Lat: {localizacao.lat.toFixed(4)}, Lng: {localizacao.lng.toFixed(4)}</p>
            </div>
          )}
        </div>

        {/* BUSCAS */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 space-y-4">
          {/* Busca por Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📍 Buscar por Bairro/Cidade
            </label>
            <div className="flex gap-2">
              <input 
                type="text"
                value={localBusca}
                onChange={(e) => setLocalBusca(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarItens()}
                placeholder="Ex: Pinheiros, Vila Madalena, Jardins..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                onClick={buscarItens}
                className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium"
              >
                Buscar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Digite um local para ver itens disponíveis naquela região (mesmo sem estar lá)
            </p>
          </div>

          {/* Busca por Nome/Categoria */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Buscar por Item ou Categoria
            </label>
            <input 
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscarItens()}
              placeholder="Ex: furadeira, móveis, câmera..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {itensFiltrados.length} {itensFiltrados.length === 1 ? "item encontrado" : "itens encontrados"}
          </p>
          {(busca || localBusca) && (
            <button 
              onClick={() => { setBusca(""); setLocalBusca(""); setItensFiltrados(itensMock); }}
              className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* LISTA DE ITENS COM PARCEIROS */}
        {itensFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itensFiltrados.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">{item.categoria}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getParceiraCor(item.parceira)}`}>
                    🏢 {item.parceira}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.nome}</h3>
                <p className="text-sm text-gray-600 mb-2">📍 {item.local}</p>
                <p className="text-2xl font-bold text-emerald-700 mb-4">{item.preco}</p>
                <button className="w-full px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800">
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-gray-600 font-medium">Nenhum item encontrado</p>
            <p className="text-sm text-gray-500 mt-1">Tente buscar por outro local ou categoria</p>
          </div>
        )}

      </div>
    </div>
  )
}
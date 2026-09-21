"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CadastrarItem() {
  const router = useRouter()
  const [form, setForm] = useState({ nome: "", categoria: "", preco: "", descricao: "" })
  const [qtdFotos, setQtdFotos] = useState(3)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  
  const handleCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value
    setForm({ ...form, categoria: cat })
    
    const qtd = {
      "Ferramentas": 3, "Eletrônicos": 3, 
      "Móveis": 4, "Roupas": 4, 
      "Petcare": 5, "Veículos": 6
    }[cat] || 3
    
    setQtdFotos(qtd)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("✅ Item cadastrado com sucesso! (Simulação)")
    router.push("/meus-itens")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastrar Novo Item</h1>
        <p className="text-gray-600 mb-6">Preencha os dados para anunciar seu item.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
            <input required name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Furadeira Bosch 500W" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria (Define qtd. de fotos)</label>
              <select required name="categoria" value={form.categoria} onChange={handleCategoria} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option value="">Selecione...</option>
                <option value="Ferramentas">Ferramentas (3 fotos)</option>
                <option value="Eletrônicos">Eletrônicos (3 fotos)</option>
                <option value="Móveis">Móveis (4 fotos)</option>
                <option value="Roupas">Roupas/Acessórios (4 fotos)</option>
                <option value="Petcare">Petcare/Animais (5 fotos)</option>
                <option value="Veículos">Veículos (6 fotos)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço por Dia (R$)</label>
              <input required type="number" name="preco" value={form.preco} onChange={handleChange} placeholder="25" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea required name="descricao" value={form.descricao} onChange={handleChange} rows={4} placeholder="Descreva o estado do item, acessórios inclusos, etc." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fotos do Item ({qtdFotos} fotos recomendadas)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
              <p className="text-4xl mb-2">📷</p>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Por favor, tire fotos bem nítidas e bem iluminadas.
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Recomendamos {qtdFotos} fotos: 1 principal do item completo, ângulos diferentes, detalhes importantes e estado de conservação. O fundo deve ser simples.
              </p>
              <input type="file" multiple className="hidden" />
              <button type="button" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                Selecionar Fotos
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => router.back()} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800">
              Publicar Anúncio
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
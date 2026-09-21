"use client"
import { useState, useEffect } from "react"

export default function Perfil() {
  const [modoUsuario, setModoUsuario] = useState("locatario")
  const [editando, setEditando] = useState(false)
  const [modalUpload, setModalUpload] = useState(false)
  const [modalNovoDoc, setModalNovoDoc] = useState(false)
  const [modalFotoPerfil, setModalFotoPerfil] = useState(false)
  const [fotoPerfil, setFotoPerfil] = useState(null)
  const [novoDocNome, setNovoDocNome] = useState("")
  const [dados, setDados] = useState({
    nome: "João Silva",
    email: "belezaemcasa666@gmail.com",
    telefone: "(11) 99999-9999",
    bio: "Usuário verificado da plataforma conectaAI",
  })
  const [temp, setTemp] = useState(dados)

  useEffect(() => {
    const modo = localStorage.getItem("modoUsuario")
    if (modo) setModoUsuario(modo)
  }, [])

  const salvar = () => { setDados(temp); setEditando(false) }
  const cancelar = () => { setTemp(dados); setEditando(false) }

  const handleFotoPerfil = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoPerfil(reader.result)
        setModalFotoPerfil(false)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO COM MODO */}
        <div className="bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {modoUsuario === "locatario" ? " Vizinho" : "💼 Tem Tudo"}
              </h1>
              <p className="text-white/90">
                {modoUsuario === "locatario" 
                  ? "Encontre itens para alugar perto de você" 
                  : "Alugue seus itens e ganhe dinheiro"}
              </p>
            </div>
          </div>
        </div>

        {/* PERFIL */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                {fotoPerfil ? (
                  <img src={fotoPerfil} alt="Foto" className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700">JS</div>
                )}
                <button onClick={() => setModalFotoPerfil(true)} className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center hover:bg-emerald-800">📷</button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{dados.nome}</h2>
                <span className="text-sm text-emerald-600">✅ Usuário Verificado</span>
              </div>
            </div>
            {!editando ? (
              <button onClick={() => setEditando(true)} className="px-4 py-2 bg-emerald-700 text-white rounded-lg">Editar Perfil</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={salvar} className="px-4 py-2 bg-emerald-700 text-white rounded-lg">Salvar</button>
                <button onClick={cancelar} className="px-4 py-2 border rounded-lg">Cancelar</button>
              </div>
            )}
          </div>
        </div>

        {/* DADOS PESSOAIS */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">👤 Dados Pessoais</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nome</label>
              {editando ? <input type="text" value={temp.nome} onChange={(e) => setTemp({...temp, nome: e.target.value})} className="w-full px-3 py-2 border rounded-lg" /> : <p className="font-medium">{dados.nome}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <p>{dados.email}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Telefone</label>
              {editando ? <input type="tel" value={temp.telefone} onChange={(e) => setTemp({...temp, telefone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" /> : <p>{dados.telefone}</p>}
            </div>
          </div>
        </div>

        {/* DOCUMENTOS */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-bold mb-4"> Documentos Verificados</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div><p className="font-medium">RG / CPF</p><p className="text-sm text-emerald-700">Verificado</p></div>
              <span>✅</span>
            </div>
            <div className="flex justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div><p className="font-medium">Comprovante de Residência</p><p className="text-sm text-emerald-700">Verificado</p></div>
              <span>✅</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 border rounded-lg">
              <div><p className="font-medium">Selfie com Documento</p><p className="text-sm text-gray-600">Pendente</p></div>
              <button onClick={() => setModalUpload(true)} className="text-sm text-emerald-700 font-medium">Enviar</button>
            </div>
          </div>
          <button onClick={() => setModalNovoDoc(true)} className="mt-4 text-sm text-emerald-700 font-medium">+ Adicionar novo documento</button>
        </div>

        {/* BIO */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold mb-4">✏️ Sobre Mim</h3>
          {editando ? (
            <div>
              <textarea value={temp.bio} onChange={(e) => setTemp({...temp, bio: e.target.value})} rows={6} className="w-full px-3 py-2 border rounded-lg" />
              <div className="mt-3 p-3 bg-emerald-50 rounded text-sm text-emerald-800"><strong>💡 Dicas:</strong> Descreva habilidades, disponibilidade e localização.</div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{dados.bio}</p>
          )}
        </div>

        {/* MODAIS */}
        {modalFotoPerfil && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">📸 Alterar Foto</h3>
              <input type="file" accept="image/*" onChange={handleFotoPerfil} className="w-full mb-4" />
              <button onClick={() => setModalFotoPerfil(false)} className="w-full px-4 py-2 border rounded-lg">Cancelar</button>
            </div>
          </div>
        )}

        {modalUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">📸 Enviar Selfie</h3>
              <input type="file" accept="image/*" className="w-full mb-4" />
              <div className="flex gap-2">
                <button onClick={() => setModalUpload(false)} className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg">Enviar</button>
                <button onClick={() => setModalUpload(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {modalNovoDoc && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">📄 Adicionar Documento</h3>
              <select value={novoDocNome} onChange={(e) => setNovoDocNome(e.target.value)} className="w-full px-3 py-2 border rounded-lg mb-4">
                <option value="">Selecione...</option>
                <option value="Certidão">Certidão de Nascimento</option>
                <option value="Título">Título de Eleitor</option>
                <option value="Carteira">Carteira de Trabalho</option>
              </select>
              <div className="flex gap-2">
                <button onClick={() => { setNovoDocNome(""); setModalNovoDoc(false); }} className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg">Adicionar</button>
                <button onClick={() => { setNovoDocNome(""); setModalNovoDoc(false); }} className="flex-1 px-4 py-2 border rounded-lg">Cancelar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}


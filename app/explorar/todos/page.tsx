'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Item {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: string;
  local: string;
  status: string;
}

export default function ExplorarTodosPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  useEffect(() => {
    const buscarItens = async () => {
      setCarregando(true);
      setErro(null);
      
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('status', 'available');

      if (error) {
        console.error('Erro ao buscar itens:', error);
        setErro('Erro ao carregar itens do banco de dados.');
      } else {
        const itensFormatados: Item[] = (data || []).map((item: any) => ({
          id: item.id,
          nome: item.name,
          descricao: item.description || 'Sem descrição',
          categoria: item.category,
          preco: `R$ ${item.price_per_day}/dia`,
          local: item.location || 'Local não informado',
          status: item.status,
        }));
        setItens(itensFormatados);
      }
      setCarregando(false);
    };
    buscarItens();
  }, []);

  const itensFiltrados = itens.filter((item) => {
    const matchBusca = busca === '' || item.nome.toLowerCase().includes(busca.toLowerCase()) || item.local.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaFiltro === '' || item.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  const categorias = [...new Set(itens.map((item) => item.categoria))];

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando itens do banco...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Itens Disponíveis</h1>
          <p className="text-gray-600">{itensFiltrados.length} {itensFiltrados.length === 1 ? 'item encontrado' : 'itens encontrados'} no banco de dados</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Buscar por nome ou local</label>
            <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex: Furadeira, Pinheiros..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📂 Filtrar por categoria</label>
            <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">Todas as categorias</option>
              {categorias.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
        </div>

        {erro && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"><strong>Erro:</strong> {erro}</div>)}

        {itensFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itensFiltrados.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <span className="text-6xl">
                    {item.categoria === 'Ferramentas' && '🔧'}
                    {item.categoria === 'Móveis' && '🪑'}
                    {item.categoria === 'Eletrônicos' && '📷'}
                    {item.categoria === 'Esportes' && '🚲'}
                    {item.categoria === 'Serviços' && '🛠️'}
                    {!['Ferramentas', 'Móveis', 'Eletrônicos', 'Esportes', 'Serviços'].includes(item.categoria) && '📦'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">{item.categoria}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.nome}</h3>
                  <p className="text-sm text-gray-500 mb-2">📍 {item.local}</p>
                  <p className="text-xs text-gray-400 italic mb-3">{item.descricao}</p>
                  <p className="text-2xl font-bold text-emerald-700 mb-4">{item.preco}</p>
                  <button className="w-full bg-emerald-700 text-white py-2 rounded-lg font-medium hover:bg-emerald-800 transition">Ver Detalhes</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-gray-600 font-medium">Nenhum item encontrado</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/explorar" className="text-emerald-700 hover:text-emerald-800 font-medium">← Voltar para categorias</a>
        </div>
      </div>
    </div>
  );
}

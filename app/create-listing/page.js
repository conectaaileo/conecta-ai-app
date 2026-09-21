"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";

export default function CreateListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    category: "Ferramentas",
    images: "",
    cep: "",
    address: "",
    ownerName: "",
    ownerPhone: ""
  });

  const categories = ["Ferramentas", "Esporte e Lazer", "Eletrônicos", "Casa e Jardim", "Veículos", "Outros"];

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      setSearchingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: `${data.logradouro}, ${data.localidade} - ${data.uf}`
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setSearchingCep(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        images: formData.images ? [formData.images] : []
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Erro ao cadastrar item");
      }
    } catch (error) {
      alert("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Item</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: Furadeira de Impacto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Descreva o item, estado de conservação, acessórios inclusos..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço por dia (R$) *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.pricePerDay}
              onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="url"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                onBlur={handleCepBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="00000-000"
                maxLength={9}
              />
              {searchingCep && (
                <Loader2 className="w-4 h-4 absolute right-3 top-3 animate-spin text-gray-400" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-gray-600 text-sm truncate">{formData.address || "Busque pelo CEP"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome *</label>
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="João Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone/WhatsApp *</label>
            <input
              type="tel"
              required
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Cadastrando..." : "Cadastrar Item"}
        </button>
      </form>
    </div>
  );
}

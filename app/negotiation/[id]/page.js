"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, DollarSign, Calendar, User, Phone, MessageCircle, Loader2 } from "lucide-react";

export default function NegotiationPage() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 1,
    days: 1,
    startDate: "",
    cep: "",
    name: "",
    phone: ""
  });

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setListing(data);
        }
      } catch (error) {
        console.error("Erro ao buscar item:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        listingId: params.id,
        listingTitle: listing.title,
        ...formData,
        totalPrice: formData.days * listing.pricePerDay,
        ownerPhone: listing.ownerPhone
      };

      const res = await fetch("/api/negotiations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const telegramMsg = `Olá! Gostaria de alugar: ${listing.title}%0A%0ADetalhes da proposta:%0A- Quantidade: ${formData.quantity}%0A- Dias: ${formData.days}%0A- Valor total: R$ ${payload.totalPrice}%0A- Entrega CEP: ${formData.cep}%0A%0AMeu contato: ${formData.name} - ${formData.phone}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${telegramMsg}`, '_blank');
      } else {
        alert("Erro ao enviar proposta");
      }
    } catch (error) {
      alert("Erro ao conectar com servidor");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Item não encontrado</h1>
        <Link href="/" className="text-green-600 hover:underline">Voltar para início</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-green-600 hover:underline mb-4 inline-block">← Voltar para lista</Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Detalhes do Item */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="aspect-video bg-gray-200">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Sem imagem</div>
            )}
          </div>
          <div className="p-6">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{listing.category}</span>
            <h1 className="text-2xl font-bold text-gray-800 mt-3">{listing.title}</h1>
            <p className="text-gray-600 mt-2">{listing.description}</p>
            
            <div className="flex items-center text-green-600 font-bold text-xl mt-4">
              <DollarSign className="w-5 h-5" />
              <span>{listing.pricePerDay}/dia</span>
            </div>

            <div className="border-t mt-6 pt-6 space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{listing.address}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <span>{listing.ownerName}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <span>{listing.ownerPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Proposta */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Fazer Proposta de Aluguel</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dias de aluguel</label>
                <input
                  type="number"
                  min="1"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Data de início
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP de entrega *</label>
              <input
                type="text"
                required
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="00000-000"
                maxLength={9}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu telefone/WhatsApp *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Valor total estimado:</span>
                <span className="text-2xl font-bold text-green-600">
                  R$ {(formData.days * listing.pricePerDay).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" /> Enviar proposta via Telegram
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

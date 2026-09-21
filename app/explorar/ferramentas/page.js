"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryItemCard from "@/components/CategoryItemCard";
import { itemsByCategory } from "@/lib/mockData";

export default function FerramentasPage() {
  const items = itemsByCategory.ferramentas;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botão voltar mais visível */}
      <Link 
        href="/explorar" 
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Explorar
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ferramentas</h1>
        <p className="text-gray-600 mt-2">Para fazer acontecer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CategoryItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
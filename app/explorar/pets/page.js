import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryItemCard from "@/components/CategoryItemCard";
import { itemsByCategory } from "@/lib/mockData";

export default function PetsPage() {
  const items = itemsByCategory.pets;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/explorar" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Explorar
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pets</h1>
        <p className="text-gray-600 mt-2">Cuidado com afeto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CategoryItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

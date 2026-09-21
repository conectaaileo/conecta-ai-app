import Link from "next/link";
import { getListings, exploreCategories } from "@/lib/mockData";

const categoryImages = {
  ferramentas: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=60",
  servicos: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=60",
  espacos: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=60",
  pets: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=60"
};

export default function Home() {
  const listings = getListings();
  return (
    <div>
      <section className="text-center py-16 px-4">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full">ENCONTRE DO SEU JEITO</span>
        <h1 className="text-5xl font-extrabold mt-6 text-gray-900">Alugue em 5 minutos com segurança</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Ferramentas, serviços, espaços e pet care da sua região — com negociação, contrato digital e suporte em cada aluguel.</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 pb-16">
        {exploreCategories.map(function (cat) {
          return (
            <Link key={cat.id} href={cat.href} className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition group">
              <img src={categoryImages[cat.id]} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                <span className="text-emerald-300 font-medium">Ver anuncios →</span>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Anuncios perto de voce</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map(function (l) {
            return (
              <div key={l.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={l.image} alt={l.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{l.title}</h3>
                  <p className="text-sm text-gray-600">{l.location}</p>
                  <p className="text-emerald-700 font-bold mt-2">R$ {l.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

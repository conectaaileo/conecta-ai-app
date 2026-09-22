import Link from "next/link";

const categories = [
  { name: "Ferramentas", icon: "🔧", href: "/explorar/todos", color: "bg-blue-50" },
  { name: "Serviços", icon: "🛠️", href: "/explorar/servicos", color: "bg-green-50" },
  { name: "Espaços", icon: "🏠", href: "/explorar/espacos", color: "bg-purple-50" },
  { name: "Pet Care", icon: "🐾", href: "/explorar/pets", color: "bg-orange-50" }
];

export default function ExplorarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ENCONTRE DO SEU JEITO
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alugue em 5 minutos com segurança
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ferramentas, serviços, espaços e pet care da sua região.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`${cat.color} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="text-center">
                <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{cat.name}</h2>
                <p className="text-gray-600 group-hover:text-gray-900">Ver anúncios →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
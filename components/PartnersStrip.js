export default function PartnersStrip() {
  const partners = [
    { name: "quintoandar", className: "text-purple-600 font-semibold lowercase" },
    { name: "Makita", className: "text-red-600 font-black italic" },
    { name: "blablacar", className: "text-blue-500 font-bold lowercase" },
    { name: "CYRELA", className: "text-gray-700 font-light tracking-[0.2em]" },
    { name: "even", className: "text-orange-600 font-bold lowercase" },
    { name: "MRV", className: "text-yellow-600 font-black tracking-tight" },
    { name: "TENDA", className: "text-red-500 font-semibold tracking-wide" }
  ];

  return (
    <section className="mb-12">
      <div className="border-t border-gray-200 pt-8">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-6">
          Parceiros que confiam na comunidade
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {partners.map((p) => (
            <span
              key={p.name}
              className={`text-lg opacity-60 hover:opacity-100 transition cursor-default ${p.className}`}
            >
              {p.name}
            </span>
          ))}
          <span className="flex items-center gap-2 text-lg opacity-80 hover:opacity-100 transition cursor-default text-green-600 font-bold">
            Qwen AI
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium uppercase tracking-wide">
              Parceiro tecnológico
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
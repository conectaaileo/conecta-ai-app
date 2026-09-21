import Link from "next/link";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

export default function ExploreCard({ category }) {
  return (
    <Link
      href={`/explorar/${category.id}`}
      className="relative h-64 rounded-2xl overflow-hidden group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-70 transition`}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {category.badge}
          </span>
          <h3 className="text-2xl font-bold mt-3">{category.name}</h3>
          <p className="text-white/80 mt-1">{category.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
          <span>Ver oportunidades</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}

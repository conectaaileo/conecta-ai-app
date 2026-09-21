"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const FOTO_RESERVA = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800";

export default function CategoryItemCard({ item }) {
  return (
    <Link
      href={`/negotiation/${item.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition block cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.src = FOTO_RESERVA;
        }}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-green-600 font-bold">$ {item.price}/dia</p>
          {item.location && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {item.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
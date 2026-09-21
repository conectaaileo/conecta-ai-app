"use client";

import { useState } from "react";
import { mockRentals, PLATFORM_FEE } from "@/lib/mockData";
import { TrendingUp, Calendar, DollarSign, Clock } from "lucide-react";

export default function RentalsPage() {
  const [rentals] = useState(mockRentals);

  const statCards = [
    {
      icon: Calendar,
      label: "Aluguéis ativos",
      value: rentals.stats.active,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Clock,
      label: "Dias restantes",
      value: rentals.stats.daysRemaining,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: DollarSign,
      label: "Total investido",
      value: `R$ ${rentals.stats.totalInvested}`,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: TrendingUp,
      label: "Total no ano",
      value: `R$ ${rentals.stats.totalYear}`,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
          ÁREA DO CONTRATANTE
        </span>
        <h1 className="text-3xl font-bold text-gray-800">Meus aluguéis</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Active Rentals */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Acordos ativos</h2>
        <div className="space-y-4">
          {rentals.active.map((rental) => (
            <div key={rental.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={rental.image} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800"; }}
                    alt={rental.item}
                    className="w-full md:w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{rental.item}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Com {rental.owner} · {rental.start} → {rental.end}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        {rental.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Valor bruto:</span>
                        <span className="font-medium text-gray-800">R$ {Number(rental.grossValue).toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Taxa ({(PLATFORM_FEE * 100).toFixed(0)}%):</span>
                        <span className="font-medium text-red-500">- R$ {(rental.grossValue * PLATFORM_FEE).toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <span className="text-gray-500">Valor líquido:</span>
                        <span className="font-bold text-green-600">R$ {(rental.grossValue * (1 - PLATFORM_FEE)).toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                    <button onClick={() => { window.location.href = "/contrato"; }} className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rental History */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de aluguéis</h2>
        <div className="space-y-4">
          {rentals.history.map((rental) => (
            <div key={rental.id} className="bg-white rounded-xl shadow-md overflow-hidden opacity-90">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={rental.image} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800"; }}
                    alt={rental.item}
                    className="w-full md:w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{rental.item}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Com {rental.owner} · {rental.start} → {rental.end}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {rental.status}
                      </span>
                      {rental.paid && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          Pago
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Valor bruto:</span>
                        <span className="font-medium text-gray-800">R$ {Number(rental.grossValue).toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Taxa ({(PLATFORM_FEE * 100).toFixed(0)}%):</span>
                        <span className="font-medium text-red-500">- R$ {(rental.grossValue * PLATFORM_FEE).toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <span className="text-gray-500">Valor líquido:</span>
                        <span className="font-bold text-green-600">R$ {(rental.grossValue * (1 - PLATFORM_FEE)).toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="text-xs text-gray-400 pt-1">
                        Valor pago: R$ {Number(rental.grossValue).toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Clock, Printer } from "lucide-react";
import { currentUser } from "@/lib/mockData";
import { modelosContrato } from "@/lib/contratos";

const mocksPorTipo = {
  ferramentas: {
    item: "Furadeira de Impacto Bosch",
    proprietario: "Mariana Souza",
    valorPorDia: 25,
    diarias: 3
  },
  servicos: {
    item: "Serviço de Eletricista",
    proprietario: "Carlos Silva",
    valorPorDia: 80,
    diarias: 1
  },
  espacos: {
    item: "Salão de Festas",
    proprietario: "Ana Lima",
    valorPorDia: 200,
    diarias: 1
  },
  pets: {
    item: "Hospedagem Pet",
    proprietario: "PetCare Jardins",
    valorPorDia: 80,
    diarias: 5
  }
};

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function ContratoConteudo() {
  const params = useSearchParams();
  const tipo = params.get("tipo") || "ferramentas";

  const modelo = modelosContrato[tipo] || modelosContrato.ferramentas;
  const mock = mocksPorTipo[tipo] || mocksPorTipo.ferramentas;

  const [aceito, setAceito] = useState(false);
  const [lido, setLido] = useState(false);

  useEffect(() => {
    const jaAceito = localStorage.getItem("contratoAceito_" + tipo) === "sim";
    setAceito(jaAceito);
    setLido(jaAceito);
  }, [tipo]);

  const subtotal = mock.diarias * mock.valorPorDia;
  const taxa = subtotal * 0.07;
  const total = subtotal + taxa;

  const preencher = (texto) =>
    texto
      .replaceAll("{item}", mock.item)
      .replaceAll("{locador}", mock.proprietario)
      .replaceAll("{locatario}", currentUser?.name || "Usuário conectaAI")
      .replaceAll("{periodo}", "12/06/2025 a 15/06/2025")
      .replaceAll("{total}", formatarMoeda(total));

  function aceitarContrato() {
    setAceito(true);
    setLido(true);
    localStorage.setItem("contratoAceito_" + tipo, "sim");
  }

  const opcoes = [
    { id: "ferramentas", label: "🛠️ Ferramentas" },
    { id: "servicos", label: "🔧 Serviços" },
    { id: "espacos", label: "🏠 Espaços" },
    { id: "pets", label: "🐶 Pets" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-6 print:hidden">
        {opcoes.map((opcao) => (
          <Link
            key={opcao.id}
            href={`/contrato?tipo=${opcao.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tipo === opcao.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {opcao.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              {modelo.nome}
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            conectaAI — plataforma de intermediação digital
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Fundamento: {modelo.baseLegal}
          </p>

          <div
            className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              aceito
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {aceito ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            {aceito ? "Aceito pelas partes" : "Aguardando aceite"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs uppercase text-gray-500 mb-1">
              {modelo.rotulos[0]}
            </p>
            <p className="font-semibold text-gray-800">{mock.proprietario}</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs uppercase text-gray-500 mb-1">
              {modelo.rotulos[1]}
            </p>
            <p className="font-semibold text-gray-800">
              {currentUser?.name || "Usuário conectaAI"}
            </p>
            {currentUser?.cpf && (
              <p className="text-xs text-gray-500">CPF: {currentUser.cpf}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {modelo.clausulas.map((clausula) => (
            <div
              key={clausula.titulo}
              className="border-l-4 border-green-600 pl-4"
            >
              <h2 className="font-bold text-gray-800 mb-1">
                {clausula.titulo}
              </h2>
              <p className="text-sm text-gray-600 text-justify">
                {preencher(clausula.texto)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {mock.diarias} diária(s) × {formatarMoeda(mock.valorPorDia)}
            </span>
            <span>{formatarMoeda(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Taxa conectaAI (7%)</span>
            <span>{formatarMoeda(taxa)}</span>
          </div>

          <div className="flex justify-between font-bold text-gray-800 mt-2 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{formatarMoeda(total)}</span>
          </div>
        </div>

        <div className="print:hidden">
          {!aceito && (
            <label className="flex items-center gap-2 text-sm text-gray-700 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={lido}
                onChange={(e) => setLido(e.target.checked)}
                className="w-4 h-4 accent-green-600"
              />
              Li e concordo com todas as cláusulas deste contrato.
            </label>
          )}

          <div className="flex gap-3">
            {!aceito && (
              <button
                onClick={aceitarContrato}
                disabled={!lido}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Aceitar contrato
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Baixar PDF
            </button>
          </div>
        </div>

        {aceito && (
          <div className="grid grid-cols-2 gap-8 mt-10 pt-6">
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-medium text-gray-800">
                  {mock.proprietario}
                </p>
                <p className="text-xs text-gray-500">{modelo.rotulos[0]}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-medium text-gray-800">
                  {currentUser?.name || "Usuário conectaAI"}
                </p>
                <p className="text-xs text-gray-500">{modelo.rotulos[1]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContratoPage() {
  return (
    <Suspense fallback={<div className="p-8">Carregando contrato...</div>}>
      <ContratoConteudo />
    </Suspense>
  );
}
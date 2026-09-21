"use client";

import Link from "next/link";

const faqs = [
  {
    q: "Como funciona a conectaAI?",
    a: "Plataforma de aluguel entre vizinhos: ferramentas, serviços, espaços e pet care. Você anuncia grátis, negocia pelo chat, fecha com contrato digital. Taxa de 7%."
  },
  {
    q: "Quais são os contratos disponíveis?",
    a: "4 modelos com base legal: Ferramentas (CC 565-578), Serviços (CC 594-609), Espaços (CC 565-578), Pets (CC + CDC). Todos com aceite eletrônico e PDF."
  },
  {
    q: "Como funciona o pagamento?",
    a: "Valor total aparece antes do aceite. Taxa conectaAI: 7% já incluída. Exemplo: 3 diárias de R$ 25 = R$ 75 + R$ 5,25 = R$ 80,25. Forma de pagamento combinada entre as partes."
  },
  {
    q: "E se quebrar ou perder o item?",
    a: "Quem causou o dano responde. Ferramentas/espaços: conserto ou reposição pelo valor de mercado (orçamento/nota). Serviços: refazer sem custo se houver defeito. Pets: cuidador responde por negligência; tutor responde por danos do animal."
  },
  {
    q: "Como funciona a devolução?",
    a: "Vistoria conjunta na entrega e devolução. Registre fotos/vídeos. Desgaste natural não é cobrado. Espaços: devolver limpo, senão taxa de limpeza. Pets: rotina conforme orientação do tutor."
  },
  {
    q: "Posso cancelar?",
    a: "Serviços: aviso de 24h antes = sem multa. Após início: valor proporcional ao trabalho realizado. Locações: combine pelo chat."
  },
  {
    q: "A conectaAI é responsável por problemas?",
    a: "A conectaAI é intermediadora tecnológica: aproxima, viabiliza pagamento e formaliza. Não responde por roubo, furto, quebra ou descumprimento. Oferece apoio de mediação de conflitos."
  },
  {
    q: "Regras para pet care?",
    a: "Tutor: vacinação em dia + informar rotina e remédios. Cuidador: seguir rotina e mandar atualizações. Emergência: pode levar ao vet; custos do tutor (salvo negligência). Fuga/lesão por negligência: responsabilidade do cuidador."
  },
  {
    q: "Como anunciar?",
    a: "Começar é grátis. Crie anúncio no site, foto boa + descrição honesta. A conectaAI cuida do contrato e formalização."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Perguntas Frequentes</h1>
      <p className="text-gray-600 mb-8">Tudo que você precisa saber sobre a conectaAI</p>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{faq.q}</h2>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Ainda tem dúvidas?</h3>
        <p className="text-gray-600 mb-3">Entre no nosso grupo do Telegram - comunidade de suporte</p>
        <a 
          href="https://t.me/Conectaai_suportebot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#0088cc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0077b3] transition"
        >
          Entrar no grupo Telegram
        </a>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-green-600 hover:underline">
          ← Voltar para o início
        </Link>
      </div>
    </div>
  );
}
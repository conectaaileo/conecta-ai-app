const TOKEN = "8976176617:AAGr5mhO4fhNxLZ8zCb2TlJhwAi7eoU_7Vg";
const GEMINI_KEY = "";
const OLLAMA_URL = "http://localhost:11434";
const OLLAMA_MODEL = "gemma2";
const SITE = "https://conectaai-hazel.vercel.app";
const GRUPO = "LINK_NOVO_AQUI";
let offset = 0;

const SISTEMA = "Voce e o Leo, assistente humano e especialista da conectaAI, plataforma brasileira de aluguel colaborativo entre vizinhos. Fala como um vizinho prestativo: caloroso, direto, emojis com moderacao, nunca parece robo de banco. Responda SEMPRE com base no conhecimento abaixo, em no maximo 4-6 linhas. Se nao souber, seja honesto e indique o grupo de suporte. Quando fizer sentido, envie o link do site ou do grupo.\n\nCONHECIMENTO CONECTAAI:\n- O que e: aluguel entre vizinhos de ferramentas, servicos, espacos e pet care. Anunciar e gratis. Taxa de 7%.\n- Contratos: 4 modelos com aceite eletronico e PDF. Ferramentas (CC 565-578), Servicos (CC 594-609), Espacos (CC 565-578), Pets (CC + CDC). Todos com clausula 6 que protege a plataforma.\n- Pagamento: valor total aparece antes do aceite. Taxa 7% ja inclusa. Ex: 3 diarias de R$25 = R$75 + R$5,25 = R$80,25. Forma de pagar combinada no chat.\n- Danos: quem causou responde. Ferramentas/espacos: conserto ou reposicao por valor de mercado (orcamento/nota). Servicos: refazer sem custo se houver defeito. Pets: cuidador responde por negligencia; tutor por danos do animal.\n- Devolucao: vistoria conjunta na entrega e devolucao, fotos/videos. Desgaste natural nao e cobrado. Espacos: devolver limpo senao taxa de limpeza.\n- Cancelamento: servicos com aviso de 24h = sem multa; apos inicio, valor proporcional. Locacoes: combinar no chat.\n- Plataforma: intermediadora tecnologica. NAO responde por roubo/furto/quebra. Oferece mediacao de conflitos.\n- Pets: tutor vacina em dia + informa rotina; cuidador segue rotina e manda atualizacoes; emergencia vet custa ao tutor salvo negligencia.\n- Site: " + SITE + "\n- Grupo de suporte: " + GRUPO;

async function chamar(metodo, body) {
  const r = await fetch("https://api.telegram.org/bot" + TOKEN + "/" + metodo, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
  });
  return r.json();
}

async function perguntarLLM(pergunta) {
  if (GEMINI_KEY) {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_KEY, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system_instruction: { parts: [{ text: SISTEMA }] }, contents: [{ parts: [{ text: pergunta }] }] })
    });
    const d = await r.json();
    return d.candidates && d.candidates[0] && d.candidates[0].content.parts[0].text;
  }
  const r = await fetch(OLLAMA_URL + "/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_MODEL, stream: false, messages: [
      { role: "system", content: SISTEMA }, { role: "user", content: pergunta }
    ]})
  });
  const d = await r.json();
  return d.message && d.message.content;
}

async function rodar() {
  console.log("🤖 Agente conectaAI NO AR! (Ctrl+C pra parar)");
  while (true) {
    try {
      const r = await fetch("https://api.telegram.org/bot" + TOKEN + "/getUpdates?offset=" + offset + "&timeout=30");
      const d = await r.json();
      for (const u of d.result || []) {
        offset = u.update_id + 1;
        const msg = u.message;
        if (!msg || !msg.text) continue;
        let resposta;
        try { resposta = await perguntarLLM(msg.text); } catch (e) { resposta = null; }
        if (!resposta) resposta = "Opa, dei uma travada! 🙈 Dá uma olhada no FAQ: " + SITE + "/faq ou chama no grupo: " + GRUPO;
        await chamar("sendMessage", { chat_id: msg.chat.id, text: resposta });
      }
    } catch (e) {
      await new Promise(function (r) { setTimeout(r, 3000); });
    }
  }
}

rodar();
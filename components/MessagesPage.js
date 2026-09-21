"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Send, Paperclip, FileText, CheckCircle, X, Image as ImageIcon } from "lucide-react";
import { mockConversations } from "@/lib/mockData";

export default function MessagesPage() {
  const params = useParams();
  const router = useRouter();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedChat, setSelectedChat] = useState(params.id || null);
  const [messageInput, setMessageInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showContract, setShowContract] = useState(false);

  const currentChat = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (!messageInput.trim() && !imagePreview) return;

    const newMessage = {
      id: `m${Date.now()}`,
      sender: "me",
      text: messageInput,
      image: imagePreview,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedChat) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: imagePreview ? "📷 Imagem enviada" : messageInput,
          time: "Agora"
        };
      }
      return conv;
    }));

    setMessageInput("");
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendContract = () => {
    setShowContract(true);
  };

  const handleAcceptContract = () => {
    alert("Contrato aceito com sucesso!");
    setShowContract(false);
  };

  // Lista de conversas
  if (!selectedChat) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mensagens</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/mensagens/${conv.id}`}
              className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition last:border-b-0"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{conv.participant}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Chat individual
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/mensagens")}
        className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
      >
        ← Voltar para conversas
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentChat?.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{currentChat?.participant}</h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {currentChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.image && (
                  <img src={msg.image} alt="Enviada" className="rounded-lg mb-2 max-w-full" />
                )}
                {msg.text && <p>{msg.text}</p>}
                <span className={`text-xs ${msg.sender === "me" ? "text-green-100" : "text-gray-400"} mt-1 block`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Contract Card */}
          {showContract && (
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Proposta de Contrato</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span className="font-medium text-gray-800">Furadeira de Impacto</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Datas:</span>
                    <span className="font-medium text-gray-800">15/08 - 20/08/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor bruto:</span>
                    <span className="font-medium text-gray-800">R$ 150,00</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Taxa da plataforma (7%):</span>
                    <span>- R$ 10,50</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600 pt-2 border-t">
                    <span>Valor líquido:</span>
                    <span>R$ 139,50</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { handleAcceptContract(); window.location.href = '/contrato'; }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Aceitar
                  </button>
                  <button
                    onClick={() => setShowContract(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {imagePreview && (
            <div className="mb-3 relative inline-block">
              <img src={imagePreview} alt="Preview" className="h-20 rounded-lg" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Paperclip className="w-5 h-5 text-gray-500" />
            </label>
            <button
              onClick={handleSendContract}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              title="Enviar contrato"
            >
              <FileText className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Digite uma mensagem..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-green-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

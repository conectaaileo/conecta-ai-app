"use client";

import { Send } from "lucide-react";

export default function TelegramSupport() {
  return (
    <a
      href="https://t.me/Conectaai_suportebot"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 bg-[#0088cc] text-white px-5 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 hover:bg-[#0077b3] transition print:hidden"
    >
      <Send className="w-4 h-4" />
      Suporte Telegram
    </a>
  );
}
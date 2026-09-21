"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function PwaInstall() {
  const [evento, setEvento] = useState(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    }
    function handler(e) {
      e.preventDefault();
      setEvento(e);
      setVisivel(true);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visivel) return null;

  return (
    <button
      onClick={async () => {
        setVisivel(false);
        if (evento) evento.prompt();
      }}
      className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 hover:bg-green-700 transition"
    >
      <Download className="w-4 h-4" />
      Baixar o app
    </button>
  );
}
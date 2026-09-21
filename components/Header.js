"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [location, setLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Simulação de notificações e mensagens (depois vem do backend)
  const hasNewMessages = true; // true = vermelho, false = verde
  const hasNewNotifications = false; // true = vermelho, false = verde

  // Função para carregar usuário do localStorage
  const loadUser = () => {
    if (typeof window !== 'undefined') {
      const loggedUser = localStorage.getItem('loggedUser');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser));
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadUser();
    
    // Escuta mudanças no localStorage
    const handleStorageChange = () => loadUser();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    router.push('/');
    window.dispatchEvent(new Event('storage'));
  };

  const nav = [
    { label: "Explorar", href: "/explorar" },
    { label: "Mensagens", href: "/mensagens" },
    { label: "Meus aluguéis", href: "/meus-aluguéis" }
  ];

  function buscar() {
    if (location.trim() !== "") {
      window.open("https://www.google.com/maps/search/" + encodeURIComponent(location), "_blank");
    }
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-700">
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" fill="currentColor" opacity="0.15"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold text-gray-900">conecta<span className="text-emerald-700">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map(function (item) {
            return (
              <Link key={item.href} href={item.href} className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center ml-auto bg-gray-100 rounded-lg px-3 py-2 gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
            <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z"/>
            <circle cx="12" cy="10" r="2.5"/>
          </svg>
          <input
            value={location}
            onChange={function (e) { setLocation(e.target.value); }}
            onKeyDown={function (e) { if (e.key === "Enter") buscar(); }}
            placeholder="Vila Madalena, SP"
            className="bg-transparent outline-none text-sm w-36"
          />
          <button onClick={buscar} className="text-gray-500 hover:text-gray-800">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          {/* Ícone de Mensagens - APENAS INDICADOR */}
          <div className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-default" title="Mensagens">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
            </svg>
            {/* Bolinha indicadora */}
            <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${hasNewMessages ? 'bg-red-500' : 'bg-green-500'}`}></span>
          </div>

          {/* Ícone de Notificações - APENAS INDICADOR */}
          <div className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-default" title="Notificações">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.7 21a2 2 0 01-3.4 0"/>
            </svg>
            {/* Bolinha indicadora */}
            <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${hasNewNotifications ? 'bg-red-500' : 'bg-green-500'}`}></span>
          </div>

          {/* MOSTRA O USUÁRIO LOGADO OU OS BOTÕES DE LOGIN */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/perfil" className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2">
                <img 
                  src={user.avatar || "https://i.pravatar.cc/150?img=11"} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-emerald-700"
                />
                <span className="hidden sm:block font-medium text-gray-700">{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 font-medium hover:bg-red-50"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-100">
                Entrar
              </Link>
              <Link href="/cadastro" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800">
                Cadastrar
              </Link>
            </>
          )}

          <button onClick={function () { setMenuOpen(!menuOpen); }} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-2">
          {nav.map(function (item) {
            return (
              <Link key={item.href} href={item.href} className="block px-2 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">
                {item.label}
              </Link>
            );
          })}
          {user ? (
            <>
              <Link href="/perfil" className="block px-2 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">
                Meu Perfil
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-2 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50">
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="block px-2 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Entrar</Link>
          )}
        </div>
      )}
    </header>
  );
}
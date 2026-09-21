'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    const currentUser = { 
      name: "João Silva", 
      email: email, 
      avatar: "https://i.pravatar.cc/150?img=11", 
      level: "Ouro" 
    };
    
    localStorage.setItem('loggedUser', JSON.stringify(currentUser));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="seu@email.com"
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
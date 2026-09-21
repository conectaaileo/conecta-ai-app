export default function Cadastro() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar conta</h1>
      <form className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Seu nome" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="voce@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="******" />
        </div>
        <button type="button" className="w-full bg-emerald-700 text-white font-semibold rounded-lg py-2 hover:bg-emerald-800">Cadastrar</button>
        <p className="text-center text-sm text-gray-600">Ja tem conta? <a href="/login" className="text-emerald-700 font-medium">Entrar</a></p>
      </form>
    </div>
  );
}

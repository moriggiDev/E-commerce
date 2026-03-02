import Header from '@/components/Header';
import Link from 'next/link';

export default function ContaPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Minha Conta</h1>
          <p className="text-purple-400 text-sm mt-1">Gerencie sua conta</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">👤</span>
            <h3 className="text-purple-400 font-bold">Perfil</h3>
            <p className="text-gray-400 text-sm">Gerencie suas informações pessoais</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">📦</span>
            <h3 className="text-purple-400 font-bold">Meus Pedidos</h3>
            <p className="text-gray-400 text-sm">Acompanhe seus pedidos</p>
            <Link href="/pedidos" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
              Ver pedidos →
            </Link>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">📍</span>
            <h3 className="text-purple-400 font-bold">Endereços</h3>
            <p className="text-gray-400 text-sm">Gerencie seus endereços de entrega</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">🔒</span>
            <h3 className="text-purple-400 font-bold">Segurança</h3>
            <p className="text-gray-400 text-sm">Altere sua senha e configurações de segurança</p>
          </div>

        </div>

        <div className="bg-gray-900 border border-purple-800 rounded-xl p-5 text-center">
          <p className="text-gray-400 text-sm mb-3">É administrador da loja?</p>
          <Link
            href="/login"
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Acessar Painel Admin
          </Link>
        </div>

      </div>
    </main>
  );
}
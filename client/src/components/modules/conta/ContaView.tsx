import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';
import Link from 'next/link';

const cards = [
  { icon: '👤', titulo: 'Perfil', descricao: 'Gerencie suas informações pessoais' },
  { icon: '📦', titulo: 'Meus Pedidos', descricao: 'Acompanhe seus pedidos', link: '/pedidos', linkLabel: 'Ver pedidos →' },
  { icon: '📍', titulo: 'Endereços', descricao: 'Gerencie seus endereços de entrega' },
  { icon: '🔒', titulo: 'Segurança', descricao: 'Altere sua senha e configurações de segurança' },
];

export default function ContaView() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Minha Conta</h1>
          <p className="text-indigo-400 text-sm mt-1">Gerencie sua conta</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((item, i) => (
            <InfoCard
              key={i}
              icon={item.icon}
              titulo={item.titulo}
              descricao={item.descricao}
              link={item.link}
              linkLabel={item.linkLabel}
            />
          ))}
        </div>

        <div className="bg-gray-900 border border-indigo-800 rounded-xl p-5 text-center">
          <p className="text-gray-400 text-sm mb-3">É administrador da loja?</p>
          <Link
            href="/login"
            className="bg-purple-700 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Acessar Painel Admin
          </Link>
        </div>

      </div>
    </main>
  );
}
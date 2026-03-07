'use client';

import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { carrinho, total } = useCart();
  const [termo, setTermo] = useState('');
  const router = useRouter();

  const totalItens = carrinho.reduce((acc, p) => acc + p.quantidade, 0);

  function handleBusca(e: React.ChangeEvent<HTMLInputElement>) {
    setTermo(e.target.value);
  }

  function executarBusca() {
    router.push(`/?busca=${termo}`);
  }

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-stone-800 text-white px-4 py-3 sm:px-6 shadow-lg shadow-stone-700 border-b border-indigo-500">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">

          <h1
            onClick={() => router.push('/')}
            className="text-2xl font-black tracking-widest text-white whitespace-nowrap hidden sm:block cursor-pointer hover:text-indigo-300 transition-colors"
          >
            NXS HUB
          </h1>

          <div className="flex-1 max-w-xl relative">
            <input
              type="text"
              value={termo}
              onChange={handleBusca}
              onKeyDown={(e) => e.key === 'Enter' && executarBusca()}
              placeholder="Buscar produtos..."
              className="w-full bg-stone-600 text-white placeholder-indigo-300 border border-indigo-700 focus:border-white focus:outline-none rounded-lg pl-4 pr-10 py-2 text-sm transition-colors"
            />
            <Search
              size={16}
              onClick={executarBusca}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white cursor-pointer transition-colors"
            />
          </div>

          <div
            onClick={() => router.push('/carrinho')}
            className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <ShoppingCart size={22} />
            <span className="text-sm font-semibold hidden sm:block">
              {totalItens} {totalItens === 1 ? 'item' : 'itens'}
            </span>
            <span className="text-sm font-bold">
              R$ {total.toFixed(2)}
            </span>
          </div>

        </div>
      </header>

      <nav className="bg-stone-700 border-b border-indigo-500 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto">
          {[
            { label: 'Início', path: '/' },
            { label: 'Games', path: '/games' },
            { label: 'Consoles', path: '/consoles' },
            { label: 'Celulares', path: '/celulares' },
            { label: 'Acessórios', path: '/acessorios' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="text-indigo-300 hover:text-white hover:bg-indigo-800 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer rounded-lg"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
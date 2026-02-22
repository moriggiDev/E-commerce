'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  vendas: number;
  popular: boolean;
  promocao: boolean;
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');
  const { adicionarProduto } = useCart();

  useEffect(() => {
    const url = filtro
      ? `http://localhost:3001/produtos?filtro=${filtro}`
      : 'http://localhost:3001/produtos';

    axios.get(url).then(res => setProdutos(res.data.produtos));
  }, [filtro]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="px-4 py-6 sm:px-6 sm:py-8 sm:max-w-6xl sm:mx-auto">

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['', 'mais-vendidos', 'populares', 'promocao'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border border-gray-300 cursor-pointer transition-colors
                ${filtro === f
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              {f === '' && 'Todos'}
              {f === 'mais-vendidos' && 'Mais Vendidos'}
              {f === 'populares' && 'Populares'}
              {f === 'promocao' && 'Promoção'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map(produto => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 text-black hover:shadow-lg hover:shadow-purple-400 active:shadow-lg active:shadow-purple-400 transition-shadow cursor-pointer"
            >
              <div className="flex gap-2 flex-wrap">
                {produto.promocao && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full w-fit">
                    🔥 Compre 1 Leve 2
                  </span>
                )}
                {produto.popular && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full w-fit">
                    ⭐ Popular
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold">{produto.nome}</h3>
              <p className="text-gray-500 text-sm">{produto.descricao}</p>
              <p className="text-xl font-bold">
                R$ {Number(produto.preco).toFixed(2)}
              </p>

              <button
                onClick={() => adicionarProduto({
                  id: produto.id,
                  nome: produto.nome,
                  preco: Number(produto.preco)
                })}
                className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors cursor-pointer font-semibold"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import ProdutoGrid from '@/components/ProdutoGrid';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  vendas: number;
  popular: boolean;
  promocao: boolean;
  imagem: string;
  categoria: string;
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('populares');
  const [busca, setBusca] = useState('');

  const router = useRouter();
  const { adicionarProduto } = useCart();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filtro) params.append('filtro', filtro);
    if (busca) params.append('busca', busca);


    const url = `${process.env.NEXT_PUBLIC_API_URL}/produtos${params.toString() ? '?' + params.toString() : ''}`;
    console.log('URL:', url);
    axios.get(url).then(res => setProdutos(res.data.produtos));


  }, [filtro, busca]);

  return (
    <main className="min-h-screen bg-gray-950">
      <Header />
      <Carousel />

      <div className="px-4 py-6 sm:px-6 sm:py-8 sm:max-w-6xl sm:mx-auto">
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['', 'mais-vendidos', 'populares', 'promocao'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border cursor-pointer transition-colors
                ${filtro === f
                  ? 'bg-purple-700 text-white border-purple-700'
                  : 'bg-transparent text-purple-300 border-purple-700 hover:bg-purple-900'
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
              onClick={() => router.push(`/produto/${produto.id}`)}
              className="hover:-translate-y-6 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-2xl overflow-hidden flex flex-col text-white transition-all hover:shadow-2xl hover:shadow-purple-500 cursor-pointer"
            >
              {produto.imagem && (
                <div className="relative w-full h-48">
                  <Image src={produto.imagem} alt={produto.nome} fill className="object-cover" />
                </div>
              )}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex gap-2 flex-wrap">
                  {produto.promocao && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      🔥 Compre 1 Leve 2
                    </span>
                  )}
                  {produto.popular && (
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      ⭐ Popular
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold">{produto.nome}</h3>
                <p className="text-gray-400 text-sm flex-1">{produto.descricao}</p>
                <p className="text-2xl font-black text-purple-400">
                  R$ {Number(produto.preco).toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    adicionarProduto({
                      id: produto.id,
                      nome: produto.nome,
                      preco: Number(produto.preco)
                    });
                  }}
                  className="mt-auto bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors cursor-pointer font-semibold"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
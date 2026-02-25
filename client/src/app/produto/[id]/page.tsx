'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';


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

export default function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const { adicionarProduto } = useCart();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setId(p.id));
  }, []);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3001/produtos/${id}`)
      .then(res => setProduto(res.data.produto))
      .catch((err) => {
        console.log('Erro:', err.message);
        router.push('/');
      });
  }, [id]);


    function handleAdicionar() {
        if (!produto) return;
        for (let i = 0; i < quantidade; i++) {
            adicionarProduto({
                id: produto.id,
                nome: produto.nome,
                preco: Number(produto.preco)
            });
        }
        router.push('/carrinho');
    }


    if (!produto) {
    return (
      <main className="min-h-screen bg-gray-950">
        <Header onBusca={() => {}} />
        <div className="flex items-center justify-center h-96">
          <p className="text-purple-400 text-xl animate-pulse">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header onBusca={() => {}} />

      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">

        <button
          onClick={() => router.back()}
          className="text-purple-400 hover:text-purple-300 text-sm mb-6 flex items-center gap-2 cursor-pointer transition-colors"
        >
          ← Voltar
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-800">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">

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

            <h1 className="text-3xl font-black text-white">{produto.nome}</h1>
            <p className="text-gray-400">{produto.descricao}</p>

            <p className="text-4xl font-black text-purple-400">
              R$ {Number(produto.preco).toFixed(2)}
            </p>

            <p className="text-gray-500 text-sm">
              Estoque: {produto.estoque} unidades
            </p>

            <div className="flex items-center gap-4">
              <span className="text-purple-300 text-sm font-semibold">Quantidade:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  −
                </button>
                <span className="text-white font-bold w-6 text-center">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(q => Math.min(produto.estoque, q + 1))}
                  className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdicionar}
              className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer tracking-wide text-lg mt-2"
            >
              Adicionar ao Carrinho
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}


'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useState } from 'react';


export default function CarrinhoPage() {
    const { carrinho, removerProduto, total, limparCarrinho } = useCart();
    const router = useRouter();
    const [finalizado, setFinalizado] = useState(false);

   function finalizarPedido() {
    const token = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith('token='));

    if (!token) {
    router.push('/cadastro?redirect=/carrinho');
    return;
}

    limparCarrinho();
    setFinalizado(true);
    setTimeout(() => {
        router.push('/');
    }, 3000);
}

    return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header onBusca={() => {}} />

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">

        <h1 className="text-3xl font-black tracking-widest text-white">
          Carrinho
        </h1>

        {finalizado ? (
          <div className="bg-green-900 border border-green-600 rounded-2xl p-8 text-center flex flex-col gap-3">
            <span className="text-4xl">✅</span>
            <h2 className="text-2xl font-bold text-green-400">Pedido Finalizado!</h2>
            <p className="text-green-300 text-sm">Redirecionando para a loja...</p>
          </div>

        ) : carrinho.length === 0 ? (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center flex flex-col gap-3">
            <span className="text-4xl">🛒</span>
            <h2 className="text-xl font-bold text-gray-400">Carrinho vazio</h2>
            <button
              onClick={() => router.push('/')}
              className="mt-2 bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer mx-auto"
            >
              Ver Produtos
            </button>
          </div>

        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {carrinho.map(produto => (
                <li key={produto.id}
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 flex justify-between items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{produto.nome}</span>
                    <span className="text-purple-400 text-sm">
                      R$ {produto.preco.toFixed(2)} × {produto.quantidade}
                    </span>
                    <span className="text-gray-400 text-sm font-bold">
                      Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="bg-red-800 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div className="bg-gray-900 border border-purple-800 rounded-2xl p-6 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-3xl font-black text-purple-400">
                  R$ {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={finalizarPedido}
                className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer tracking-wide"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  );
}



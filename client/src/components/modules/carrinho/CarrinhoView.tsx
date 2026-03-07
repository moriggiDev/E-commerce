'use client';


import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import CarrinhoItem from './CarrinhoItem';




export default function CarrinhoView() {
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
            <Header />

            <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
                <h1 className="text-3xl font-black tracking-widest text-white">
                    Carrinho
                </h1>

                {/* --- INÍCIO DA LÓGICA DE RENDERIZAÇÃO --- */}
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
                            className="mt-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer mx-auto"
                        >
                            Ver Produtos
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="flex flex-col gap-3">
                            {carrinho.map(produto => (
                                <CarrinhoItem
                                    key={produto.id}
                                    produto={produto}
                                    onRemover={removerProduto}
                                />
                            ))}
                        </ul>

                        <div className="bg-gray-900 border border-indigo-800 rounded-2xl p-6 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-gray-400 text-sm">Total</span>
                                <span className="text-3xl font-black text-indigo-600">
                                    R$ {total.toFixed(2)}
                                </span>
                            </div>
                            <button
                                onClick={finalizarPedido}
                                className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer tracking-wide"
                            >
                                Finalizar Pedido
                            </button>
                        </div>
                    </>
                )}
                {/* --- FIM DA LÓGICA DE RENDERIZAÇÃO --- */}
            </div>
        </main>
    );
}
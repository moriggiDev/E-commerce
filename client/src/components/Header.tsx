'use client';

import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
    onBusca: (termo: string) => void;
}

export default function Header({ onBusca }: HeaderProps) {
    const { carrinho, total } = useCart();
    const [termo, setTermo] = useState('');

    const totalItens = carrinho.reduce((acc, p) => acc + p.quantidade, 0);

    function handleBusca(e: React.ChangeEvent<HTMLInputElement>) {
        setTermo(e.target.value);
        onBusca(e.target.value);
    }

    return (
        <header className="bg-purple-900 text-white px-4 py-3 sm:px-6 sticky top-0 z-50 shadow-lg shadow-purple-950 border-b border-purple-700">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">

                <h1 className="text-2xl font-black tracking-widest text-white whitespace-nowrap hidden sm:block">
                    NXS HUB
                </h1>

                <input
                    type="text"
                    value={termo}
                    onChange={handleBusca}
                    placeholder="Buscar produtos..."
                    className="flex-1 max-w-xl bg-purple-800 text-white placeholder-purple-300 border border-purple-600 focus:border-white focus:outline-none rounded-lg px-4 py-2 text-sm transition-colors"
                />

                <div className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
                    <ShoppingCart size={22} />
                    <span className="text-sm font-semibold">
                        {totalItens} {totalItens === 1 ? 'item' : 'itens'}
                    </span>
                    <span className="text-sm font-bold">
                        R$ {total.toFixed(2)}
                    </span>
                </div>

            </div>
        </header>
    );
}
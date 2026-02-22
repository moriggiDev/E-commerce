'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';


export default function Header() {
    const { carrinho, total } = useCart();

    const totalItens = carrinho.reduce((acc, p) => acc + p.quantidade, 0);

    return (
        <header className="bg-black text-white px-4 py-3 sm:px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Image
                    src="/icon.jpeg"
                    alt="NXS Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                />

                <div className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                    <ShoppingCart size={30} />
                    <span className="text-sm font-semibold">
                        {totalItens} {totalItens === 1 ? 'item' : 'itens'}
                    </span>
                    <span className="text-sm font-bold">
                        R$ {total.toFixed(2)}
                    </span>
                </div>
            </div>
        </header>
    )
}
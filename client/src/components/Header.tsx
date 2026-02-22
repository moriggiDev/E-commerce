'use client';

import { useCart } from "@/context/CartContext";

export default function Header() {
    const { carrinho, total } = useCart();

    const totalItens = carrinho.reduce((acc, p) => acc + p.quantidade, 0);

    return (
        <header>
            <h1>Lojinha</h1>

            <div>
                <span>
                    {totalItens} {totalItens === 1 ? 'item' : 'itens'}
                </span>
                <span>
                    R$ {total.toFixed(2)}
                </span>
            </div>
        </header>
    )
}
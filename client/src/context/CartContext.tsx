'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  carrinho: Produto[];
  adicionarProduto: (produto: Omit<Produto, 'quantidade'>) => void;
  removerProduto: (id: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [carrinho, setCarrinho] = useState<Produto[]>(() => {
        if (typeof window === 'undefined') return [];
        const salvo = localStorage.getItem('carrinho');
        return salvo ? JSON.parse(salvo) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    function adicionarProduto(produto: Omit<Produto, 'quantidade'>) {
        setCarrinho(atual => {
            const existe = atual.find(p => p.id === produto.id);
            if(existe) {
                return atual.map(p =>
                    p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p 
                );
            }
            return [...atual, { ...produto, quantidade: 1 }];
        });
    }

    function removerProduto(id: number) {
        setCarrinho(atual => atual.filter(p => p.id !== id));
    }

    const total = carrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

    return (
        <CartContext.Provider value={{ carrinho, adicionarProduto, removerProduto, total }}>
            {children}
        </CartContext.Provider>
    );


}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart deve ser usado dentro do CartProvider');
    return context;
}
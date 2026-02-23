'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


/* Cada arquivo no TypeScript é independente. A interface que criamos no page.tsx da Home não existe aqui.
   Podemos criar um arquivo separado e importar em todo lugar, mas por enquanto estou gostando de declarar
   as tipagens dentro dos arquivos */

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

export default function AdminPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [vendas, setVendas] = useState('');
    const [popular, setPopular] = useState(false);
    const [promocao, setPromocao] = useState(false);

    const router = useRouter();


    function getToken() {
        const cookie = document.cookie.split('; ').find(r => r.startsWith('token'));
        return cookie ? cookie.split('=')[1] : null;
    }

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
        .then(res => setProdutos(res.data.produtos))
        .catch(() => router.push('/login'));
    }, []);


    async function adicionarProduto(e: React.FormEvent) {
        e.preventDefault();
        const token = getToken();

        try {
            await axios.post('http://localhost:3001/produtos',
                {
                   nome,
                   descricao,
                   preco: Number(preco),
                   estoque: Number(estoque),
                   vendas: Number(vendas) || 0,
                   popular,
                   promocao

                },
                { headers: { Authorization: `Bearer ${token}`} }
            );
            setNome('');
            setDescricao('');
            setPreco('');
            setEstoque('');
            setVendas('');
            setPopular(false);
            setPromocao(false);

            const res = await axios.get('http://localhost:3001/produtos');
            setProdutos(res.data.produtos);
        } catch (err) {
            router.push('/login');
        }
    }

    async function apagarProduto(id: number) {
        const token = getToken();

        try {
            await axios.delete(`http://localhost:3001/produtos/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProdutos(produtos.filter(p => p.id !== id));
        } catch (err) {
            router.push('/login');
        }
    }

    return (
        <main>
            <h1>Painel Admin</h1>

            <h2>Adicionar Produto</h2>
            <form onSubmit={adicionarProduto}>
                <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
                <input placeholder="Estoque" value={estoque} onChange={e => setEstoque(e.target.value)} />
                <input placeholder="Vendas" value={vendas} onChange={e => setVendas(e.target.value)} />

                <label>
                    <input type="checkbox" checked={popular} onChange={e => setPopular(e.target.checked)} />
                    Popular
                </label>
                <label>
                    <input type="checkbox" checked={promocao} onChange={e => setPromocao(e.target.checked)} />
                    Promoção
                </label>
                <button type="submit">Adicionar</button>
            </form>   


            <h2>Produtos Cadastrados</h2>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <span>{produto.nome} — R$ {Number(produto.preco).toFixed(2)}</span>
                        <button onClick={() => apagarProduto(produto.id)}>Apagar</button>
                    </li>
                ))}
            </ul>
        </main>
    )
}



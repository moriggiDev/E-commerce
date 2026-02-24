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
    <main className="min-h-screen bg-gray-950 text-white px-4 py-8 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        <div className="text-center">
          <h1 className="text-4xl font-black tracking-widest text-white">NXS HUB</h1>
          <p className="text-purple-400 text-sm mt-1">Painel Administrativo</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-purple-800 shadow-xl shadow-purple-950 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-300">Adicionar Produto</h2>

          <form onSubmit={adicionarProduto} className="flex flex-col gap-3">
            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
            <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
              <input placeholder="Estoque" value={estoque} onChange={e => setEstoque(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
            </div>
            <input placeholder="Vendas" value={vendas} onChange={e => setVendas(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={popular} onChange={e => setPopular(e.target.checked)}
                  className="w-4 h-4 accent-purple-500" />
                <span className="text-purple-300 text-sm">Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={promocao} onChange={e => setPromocao(e.target.checked)}
                  className="w-4 h-4 accent-purple-500" />
                <span className="text-purple-300 text-sm">Promoção</span>
              </label>
            </div>

            <button type="submit"
              className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer tracking-wide mt-2">
              Adicionar Produto
            </button>
          </form>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-purple-800 shadow-xl shadow-purple-950 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-300">Produtos Cadastrados</h2>

          <ul className="flex flex-col gap-3">
            {produtos.map(produto => (
              <li key={produto.id}
                className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{produto.nome}</span>
                  <span className="text-purple-400 text-sm">R$ {Number(produto.preco).toFixed(2)}</span>
                </div>
                <button onClick={() => apagarProduto(produto.id)}
                  className="bg-red-800 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                  Apagar
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );

}  
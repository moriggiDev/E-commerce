'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export default function AdminView() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [emailAdmin, setEmailAdmin] = useState('');
  const [mensagemAdmin, setMensagemAdmin] = useState('');
  const [erroAdmin, setErroAdmin] = useState('');
  
  // Estados do formulário de produto
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [vendas, setVendas] = useState('');
  const [imagem, setImagem] = useState('');
  const [categoria, setCategoria] = useState('tecnologia');
  const [popular, setPopular] = useState(false);
  const [promocao, setPromocao] = useState(false);

  // 1. Função Utilitária para Token
  const getToken = () => {
    if (typeof document === 'undefined') return null;
    const token = document.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('token='));
    return token ? token.split('=')[1] : null;
  };

  // 2. Função de Busca (Declarada ANTES do useEffect para evitar erros)
 async function fetchProdutos() {
  try {
    const res = await axios.get('http://localhost:3001/produtos');
    setProdutos(res.data.produtos);
  } catch (err) {
    router.push('/login');
  }
}

  // 3. Efeito Inicial
 useEffect(() => {
    async function carregarDados() {
      try {
        const res = await axios.get('http://localhost:3001/produtos');
        setProdutos(res.data.produtos);
      } catch (err) {
        router.push('/login');
      }
    }
    carregarDados();
  }, [router]); // Adicionamos o router como dependência para satisfazer o aviso

  // 4. Lógica de Adicionar Produto
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
          promocao,
          imagem,
          categoria
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Limpar formulário
      setImagem('');
      setCategoria('tecnologia');
      setNome('');
      setDescricao('');
      setPreco('');
      setEstoque('');
      setVendas('');
      setPopular(false);
      setPromocao(false);

      // Atualizar lista após sucesso
      await fetchProdutos();
    } catch (err) {
      console.error("Erro ao adicionar:", err);
      router.push('/login');
    }
  }

  // 5. Lógica de Apagar Produto
  async function apagarProduto(id: number) {
    const token = getToken();
    try {
      await axios.delete(`http://localhost:3001/produtos/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      router.push('/login');
    }
  }

  // 6. Lógica de Promover Admin
  async function promoverAdmin(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    setMensagemAdmin('');
    setErroAdmin('');

    try {
      await axios.post('http://localhost:3001/auth/promover-admin',
        { email: emailAdmin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagemAdmin(`${emailAdmin} agora é admin!`);
      setEmailAdmin('');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setErroAdmin('Usuário não encontrado.');
      } else {
        setErroAdmin('Erro ao promover usuário.');
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-8 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-widest text-white">NXS HUB</h1>
          <p className="text-indigo-600 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card: Adicionar Produto */}
        <div className="bg-gray-900 rounded-2xl border border-indigo-800 shadow-xl shadow-purple-950 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-indigo-600">Adicionar Produto</h2>
          <form onSubmit={adicionarProduto} className="flex flex-col gap-3">
            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-700 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
            <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-700 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors" />
            
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 focus:border-indigo-700 rounded-lg px-4 py-3 text-sm" />
              <input placeholder="Estoque" value={estoque} onChange={e => setEstoque(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 focus:border-indigo-700 rounded-lg px-4 py-3 text-sm" />
            </div>
            
            <input placeholder="Vendas" value={vendas} onChange={e => setVendas(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 focus:border-indigo-700 rounded-lg px-4 py-3 text-sm" />

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={popular} onChange={e => setPopular(e.target.checked)}
                  className="w-4 h-4 accent-indigo-700" />
                <span className="text-indigo-600 text-sm">Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={promocao} onChange={e => setPromocao(e.target.checked)}
                  className="w-4 h-4 accent-indigo-700" />
                <span className="text-indigo-600 text-sm">Promoção</span>
              </label>
            </div>

            <input placeholder="URL da imagem" value={imagem} onChange={e => setImagem(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm" />

            <select value={categoria} onChange={e => setCategoria(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none">
              <option value="Inicio">Tecnologia</option>
              <option value="games">Games</option>
              <option value="consoles">Consoles</option>
              <option value="acessorios">Acessórios</option>
              <option value="celulares">Celulares</option>
            </select>

            <button type="submit"
              className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer tracking-wide mt-2">
              Adicionar Produto
            </button>
          </form>
        </div>

        {/* Card: Lista de Produtos */}
        <div className="bg-gray-900 rounded-2xl border border-indigo-800 shadow-xl shadow-indigo-700 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-indigo-600">Produtos Cadastrados</h2>
          <ul className="flex flex-col gap-3">
            {produtos.map(produto => (
              <li key={produto.id}
                className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{produto.nome}</span>
                  <span className="text-indigo-600 text-sm">R$ {Number(produto.preco).toFixed(2)}</span>
                </div>
                <button onClick={() => apagarProduto(produto.id)}
                  className="bg-red-800 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                  Apagar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Card: Promover Admin */}
        <div className="bg-gray-900 rounded-2xl border border-indigo-800 shadow-xl shadow-purple-950 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-indigo-500">Promover para Admin</h2>
          <form onSubmit={promoverAdmin} className="flex flex-col gap-3">
            <input
              placeholder="Email do usuário"
              value={emailAdmin}
              onChange={e => setEmailAdmin(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm"
            />
            {erroAdmin && <p className="text-red-400 text-sm text-center bg-red-950 border border-red-800 rounded-lg px-4 py-2">{erroAdmin}</p>}
            {mensagemAdmin && <p className="text-indigo-600 text-sm text-center bg-indigo-700 border border-indigo-800 rounded-lg px-4 py-2">{mensagemAdmin}</p>}
            <button type="submit"
              className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
              Promover para Admin
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
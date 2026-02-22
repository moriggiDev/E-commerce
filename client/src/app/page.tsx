'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header'


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


export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const url = filtro
      ? `http://localhost:3001/produtos?filtro=${filtro}`
      : 'http://localhost:3001/produtos';

      axios.get(url).then(res => setProdutos(res.data.produtos));
  }, [filtro]);


  return (
    <main>
      <Header />
      <div>
        <button onClick={() => setFiltro('')}>Todos</button>
        <button onClick={() => setFiltro('mais-vendidos')}>Mais Vendidos</button>
        <button onClick={() => setFiltro('populares')}>Populares</button>
        <button onClick={() => setFiltro('promocao')}>Promoção</button>
      </div>

      <div>
        {produtos.map(produto => (
          <div key={produto.id}>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p>R$ {Number(produto.preco).toFixed(2)}</p>
            {produto.promocao && <span>🔥 Compre 1 Leve 2!</span>}
          </div>
        ))}
      </div>
    </main>
  );
}
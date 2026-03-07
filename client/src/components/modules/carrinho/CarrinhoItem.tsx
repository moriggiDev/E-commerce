'use client';


// Definimos o que este componente precisa receber para funcionar
interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}


interface CarrinhoItemProps {
  produto: Produto;
  onRemover: (id: number) => void;
}



export default function CarrinhoItem({ produto, onRemover }: CarrinhoItemProps) {


  return (
    <li className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 flex justify-between items-center gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-white">{produto.nome}</span>
        <span className="text-indigo-600 text-sm">
          R$ {produto.preco.toFixed(2)} × {produto.quantidade}
        </span>
        <span className="text-gray-400 text-sm font-bold">
          Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
        </span>
      </div>
      <button
        onClick={() => onRemover(produto.id)}
        className="bg-red-800 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
      >
        Remover
      </button>
    </li>
  );
}
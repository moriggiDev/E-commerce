import Header from '@/components/Header';
import Link from 'next/link';


export default function PedidosPage() {
    return (
        <main className="min-h-screen bg-gray-950 text-white">
            <Header />
            <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

                <div>
                    <h1 className="text-3xl font-black tracking-widest text-white">Meus Pedidos</h1>
                    <p className="text-purple-400 text-sm mt-1">Acompanhe seus pedidos</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col items-center gap-4 text-center">
                    <span className="text-5xl">📦</span>
                    <h2 className="text-xl font-bold text-gray-400">Nenhum pedido encontrado</h2>
                    <p className="text-gray-600 text-sm">Quando você realizar uma compra ela aparecerá aqui.</p>

                    <Link
                        href="/"
                        className="mt-2 bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                    >
                        Explorar Produtos
                    </Link>
                </div>   
                
            </div>

              
        </main >
  );
}
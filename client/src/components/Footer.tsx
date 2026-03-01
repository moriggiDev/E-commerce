'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-950 border-t border-purple-900 mt-12">

      <div className="flex">

        <div className="hidden sm:block sm:flex-1 relative h-64 md:h-80">
          <Image src="/images/hero-right.png" alt="RTX e Headset" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950 opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 gap-3">
            <h3 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Categorias</h3>
            {[
              { label: 'Inicio', path: '/' },
              { label: 'Games', path: '/games' },
              { label: 'Consoles', path: '/consoles' },
              { label: 'Celulares', path: '/celulares' },
              { label: 'Acessórios', path: '/acessorios' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="text-gray-200 hover:text-purple-400 text-sm text-left transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full sm:flex-[2] relative h-64 md:h-80">
          <Image src="/images/hero-center.png" alt="Setup NXS" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-4xl font-black tracking-widest text-white drop-shadow-lg">NXS HUB</span>
            <span className="text-purple-400 text-sm font-semibold">Tech & Games</span>
            <div className="flex gap-4 mt-4">
              {['Instagram', 'Twitter', 'YouTube', 'Discord'].map(item => (
                <span key={item} className="text-gray-300 hover:text-purple-400 text-xs cursor-pointer transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden sm:block sm:flex-1 relative h-64 md:h-80">
          <Image src="/images/hero-left.png" alt="PS5 Roxo" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-950 opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 gap-3">
            <h3 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Suporte</h3>
            {['Central de Ajuda', 'Trocas e Devoluções', 'Fale Conosco', 'Meus Pedidos', 'Minha Conta'].map(item => (
              <span key={item} className="text-gray-200 text-sm cursor-pointer hover:text-purple-400 transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center">
        <p className="text-gray-600 text-xs">© 2026 NXS HUB — Todos os direitos reservados</p>
      </div>

    </footer>
  );
}
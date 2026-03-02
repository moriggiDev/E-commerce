'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// SVG Icons para formas de pagamento
const PaymentIcons = {
  Visa: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <path d="M20.5 21H17.6L19.4 11H22.3L20.5 21Z" fill="white"/>
      <path d="M30.4 11.3C29.8 11.1 28.9 10.9 27.8 10.9C25 10.9 23 12.3 23 14.3C23 15.8 24.4 16.6 25.5 17.1C26.6 17.6 27 17.9 27 18.3C27 18.9 26.2 19.2 25.5 19.2C24.5 19.2 24 19.1 23.1 18.7L22.7 18.5L22.3 21C23 21.3 24.3 21.6 25.6 21.6C28.6 21.6 30.5 20.2 30.5 18.1C30.5 16.9 29.7 16 28.1 15.3C27.1 14.8 26.5 14.5 26.5 14.1C26.5 13.7 27 13.3 28 13.3C28.8 13.3 29.4 13.5 29.9 13.7L30.2 13.8L30.4 11.3Z" fill="white"/>
      <path d="M34.2 17.4C34.4 16.9 35.3 14.5 35.3 14.5C35.3 14.5 35.5 14 35.7 13.6L35.9 14.4C35.9 14.4 36.5 17.1 36.6 17.4H34.2ZM38.1 11H35.8C35.1 11 34.6 11.2 34.3 11.9L30.1 21H33.1L33.7 19.4H37.3L37.6 21H40.3L38.1 11Z" fill="white"/>
      <path d="M15.4 11L12.6 17.8L12.3 16.4C11.8 14.9 10.3 13.2 8.7 12.3L11.3 21H14.3L18.4 11H15.4Z" fill="white"/>
      <path d="M10.3 11H5.8L5.7 11.2C9.2 12.1 11.5 14.1 12.3 16.4L11.4 12C11.3 11.2 10.9 11 10.3 11Z" fill="#FAA61A"/>
    </svg>
  ),
  Mastercard: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#252525"/>
      <circle cx="19" cy="16" r="8" fill="#EB001B"/>
      <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
      <path d="M24 10.3C25.5 11.4 26.5 13.1 26.5 16C26.5 18.9 25.5 20.6 24 21.7C22.5 20.6 21.5 18.9 21.5 16C21.5 13.1 22.5 11.4 24 10.3Z" fill="#FF5F00"/>
    </svg>
  ),
  Amex: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#2E77BC"/>
      <text x="24" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">AMEX</text>
    </svg>
  ),
  Elo: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#000"/>
      <text x="9" y="14" fill="#FFCB05" fontSize="9" fontWeight="bold" fontFamily="Arial">e</text>
      <text x="15" y="14" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">lo</text>
      <circle cx="12" cy="20" r="4" fill="none" stroke="#FFCB05" strokeWidth="2"/>
      <path d="M16 20h6" stroke="white" strokeWidth="2"/>
      <path d="M12 16v-2" stroke="#FFCB05" strokeWidth="2"/>
    </svg>
  ),
  GooglePay: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="white"/>
      <text x="7" y="21" fill="#4285F4" fontSize="8" fontWeight="bold" fontFamily="Arial">G</text>
      <text x="13" y="21" fill="#333" fontSize="8" fontWeight="500" fontFamily="Arial">Pay</text>
    </svg>
  ),
  ApplePay: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="black"/>
      <path d="M18 12C18.8 11 19.3 9.8 19.1 8.6C18 8.7 16.7 9.3 15.9 10.3C15.2 11.1 14.6 12.4 14.8 13.5C16 13.6 17.2 12.9 18 12Z" fill="white"/>
      <path d="M19.1 13.7C17.5 13.6 16.1 14.6 15.3 14.6C14.5 14.6 13.3 13.7 12 13.8C10.3 13.8 8.7 14.7 7.9 16.2C6.2 19.2 7.5 23.6 9.1 26C9.9 27.1 10.9 28.4 12.2 28.3C13.4 28.3 13.9 27.5 15.4 27.5C16.9 27.5 17.3 28.3 18.6 28.3C19.9 28.3 20.8 27.1 21.6 26C22.5 24.7 22.9 23.5 22.9 23.4C22.8 23.4 20.4 22.5 20.4 19.7C20.4 17.3 22.3 16.2 22.4 16.1C21.3 14.5 19.6 13.7 19.1 13.7Z" fill="white" transform="scale(0.65) translate(5, -3)"/>
      <text x="24" y="21" fill="white" fontSize="8" fontWeight="500" fontFamily="Arial">Pay</text>
    </svg>
  ),
  Pix: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#32BCAD"/>
      <path d="M24 8L28.5 12.5L24 17L19.5 12.5L24 8Z" fill="white"/>
      <path d="M24 15L28.5 19.5L24 24L19.5 19.5L24 15Z" fill="white" opacity="0.7"/>
      <path d="M17 11.5L21.5 16L17 20.5L12.5 16L17 11.5Z" fill="white" opacity="0.7"/>
      <path d="M31 11.5L35.5 16L31 20.5L26.5 16L31 11.5Z" fill="white" opacity="0.7"/>
    </svg>
  ),
  Boleto: () => (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
      <rect x="8" y="10" width="2" height="12" fill="#333"/>
      <rect x="12" y="10" width="1" height="12" fill="#333"/>
      <rect x="15" y="10" width="3" height="12" fill="#333"/>
      <rect x="20" y="10" width="1" height="12" fill="#333"/>
      <rect x="23" y="10" width="2" height="12" fill="#333"/>
      <rect x="27" y="10" width="1" height="12" fill="#333"/>
      <rect x="30" y="10" width="3" height="12" fill="#333"/>
      <rect x="35" y="10" width="1" height="12" fill="#333"/>
      <rect x="38" y="10" width="2" height="12" fill="#333"/>
    </svg>
  ),
};

const paymentMethods = [
  { name: 'Visa', Icon: PaymentIcons.Visa },
  { name: 'Mastercard', Icon: PaymentIcons.Mastercard },
  { name: 'Amex', Icon: PaymentIcons.Amex },
  { name: 'Elo', Icon: PaymentIcons.Elo },
  { name: 'Google Pay', Icon: PaymentIcons.GooglePay },
  { name: 'Apple Pay', Icon: PaymentIcons.ApplePay },
  { name: 'Pix', Icon: PaymentIcons.Pix },
  { name: 'Boleto', Icon: PaymentIcons.Boleto },
];

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-950 border-t border-purple-900 mt-12">

      <div className="flex">

        {/* Coluna esquerda - Categorias */}
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

        {/* Coluna central - Logo + Redes Sociais + Pagamentos */}
        <div className="w-full sm:flex-[2] relative h-64 md:h-80">
          <Image src="/images/hero-center.png" alt="Setup NXS" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
            {/* Topo: Logo + Redes Sociais */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-black tracking-widest text-white drop-shadow-lg">NXS HUB</span>
              <span className="text-purple-400 text-sm font-semibold">Tech & Games</span>
              <div className="flex gap-4 mt-1">
                {['Instagram', 'Twitter', 'YouTube', 'Discord'].map(item => (
                  <span key={item} className="text-gray-300 hover:text-purple-400 text-xs cursor-pointer transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Base: Formas de Pagamento */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-px bg-purple-800 mb-1" />
              <span className="text-gray-400 text-xs uppercase tracking-widest">Formas de Pagamento</span>
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {paymentMethods.map(({ name, Icon }) => (
                  <div
                    key={name}
                    title={name}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita - Suporte */}
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

      {/* Rodapé inferior */}
      <div className="border-t border-gray-800 py-4 text-center">
        <p className="text-gray-600 text-xs">© 2026 NXS HUB — Todos os direitos reservados</p>
      </div>

    </footer>
  );
}
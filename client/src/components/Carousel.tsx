'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  '/images/produtos/banner1.png',
  '/images/produtos/banner2.png',
  '/images/produtos/banner3.png',
  '/images/produtos/banner4.png',
  '/images/produtos/banner5.png',
  '/images/produtos/banner6.png',
  '/images/produtos/banner7.png',
];

export default function Carousel() {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAtual(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  function anterior() {
    setAtual(prev => (prev - 1 + banners.length) % banners.length);
  }

  function proximo() {
    setAtual(prev => (prev + 1) % banners.length);
  }

  const visiveis = [
    banners[atual % banners.length],
    banners[(atual + 1) % banners.length],
    banners[(atual + 2) % banners.length],
  ];

  return (
    <div className="relative w-full overflow-hidden">

      <div className="hidden sm:flex gap-2 h-48 sm:h-64">
        {visiveis.map((banner, i) => (
          <div key={i} className="relative flex-1 h-full">
            <Image           // Substitui 0 <img, por causa da prop srcset="" que estava alterando o tamnho das imagens
              src={banner}
              alt={`Banner ${i + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      <div className="sm:hidden relative h-48">
        <Image
          src={banners[atual]}
          alt={`Banner ${atual + 1}`}
          fill
          className="object-cover"
        />
      </div>

      <button
        onClick={anterior}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all cursor-pointer z-10 text-2xl"
      >
        ‹
      </button>

      <button
        onClick={proximo}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all cursor-pointer z-10 text-2xl"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setAtual(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              i === atual ? 'bg-purple-400 w-4' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
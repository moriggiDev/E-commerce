'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await axios.post('http://localhost:3001/auth/login', {
                email,
                senha
            });

            document.cookie = `token=${resposta.data.token}; path=/; max-age=28800`;
            router.push('/admin');

        } catch (err) {
            setErro('Email ou senha inválidos.');
        }
    }

    return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl shadow-purple-950 border border-purple-800 p-8 flex flex-col gap-6">
        
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-widest text-white">NXS HUB</h1>
          <p className="text-purple-400 text-sm mt-1">Acesso ao painel administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700
               focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm font-semibold">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700
               focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors"
            />
          </div>

          {erro && (
            <p className="text-red-400 text-sm text-center bg-red-950 border border-red-800 rounded-lg px-4 py-2">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white 
            font-bold py-3 rounded-lg transition-colors cursor-pointer tracking-wide"
          >
            Entrar
          </button>
        </form>

      </div>
    </main>
  );
}
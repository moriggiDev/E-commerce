'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CadastroPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

   async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
        await axios.post('http://localhost:3001/auth/cadastrar', {
            nome,
            email,
            senha
        });

        // Login automático após cadastro
        const resposta = await axios.post('http://localhost:3001/auth/login', {
            email,
            senha
        });

        document.cookie = `token=${resposta.data.token}; path=/; max-age=28800`;

        setSucesso('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => router.push(redirect || '/'), 2000);

    } catch (err: unknown) {
        if (!axios.isAxiosError(err)) return;
        if (err.response?.status === 409) {
            setErro('Este email já está cadastrado.');
        } else {
            setErro('Erro ao criar conta. Tente novamente.');
        }
    }
}

    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl shadow-purple-950 border border-purple-800 p-8 flex flex-col gap-6">

                <div className="text-center">
                    <h1 className="text-4xl font-black tracking-widest text-white">NXS HUB</h1>
                    <p className="text-purple-400 text-sm mt-1">Crie sua conta</p>
                </div>

                <form onSubmit={handleCadastro} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-purple-300 text-sm font-semibold">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Seu nome"
                            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-purple-300 text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-purple-300 text-sm font-semibold">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="••••••••"
                            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors"
                        />
                    </div>

                    {erro && (
                        <p className="text-red-400 text-sm text-center bg-red-950 border border-red-800 rounded-lg px-4 py-2">
                            {erro}
                        </p>
                    )}

                    {sucesso && (
                        <p className="text-green-400 text-sm text-center bg-green-950 border border-green-800 rounded-lg px-4 py-2">
                            {sucesso}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="mt-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer tracking-wide"
                    >
                        Criar Conta
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm">
                    Já tem uma conta?{' '}
                    <span
                        onClick={() => router.push(`/login${redirect ? '?redirect=' + redirect : ''}`)}
                        className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors"
                    >
                        Fazer login
                    </span>
                </p>

            </div>
        </main>
    );
}
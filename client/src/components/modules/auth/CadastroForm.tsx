'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CadastroForm() {
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
            // 1. Cadastro
            await axios.post('http://localhost:3001/auth/cadastrar', { nome, email, senha });

            // 2. Login automático
            const resposta = await axios.post('http://localhost:3001/auth/login', { email, senha });

            // 3. Salva o Cookie (8 horas de duração)
            document.cookie = `token=${resposta.data.token}; path=/; max-age=28800`;

            setSucesso('Conta criada com sucesso! Redirecionando...');
            
            // 4. Redirecionamento Inteligente
            setTimeout(() => {
                router.push(redirect || '/');
            }, 2000);

        } catch (err: unknown) {
            if (!axios.isAxiosError(err)) return;
            setErro(err.response?.status === 409 
                ? 'Este email já está cadastrado.' 
                : 'Erro ao criar conta. Tente novamente.');
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
                    {/* Campos de Input (Nome, Email, Senha) */}
                    {/* ... (Seu JSX de inputs aqui) ... */}
                    
                    <button type="submit" className="...">Criar Conta</button>
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
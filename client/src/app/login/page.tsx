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

            document.cookie = `token=${resposta.data.token}; path=/`;
            router.push('/admin');

        } catch (err) {
            setErro('Email ou senha inválidos.');
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='seu@email.com'
                    />
                </div>

                <div>
                    <label>Senha</label>
                    <input 
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder='sua senha'
                    />
                </div>

                {erro && <p>{erro}</p>}

                <button type='submit'>Entrar</button>
            </form>
        </main>
    );
}
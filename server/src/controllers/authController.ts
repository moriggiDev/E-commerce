import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export async function cadastrar(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ error: 'Preencha todos os campos.' });
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    );
    res.status(201).json({ usuario: resultado.rows[0] });
  } catch (erro: any) {
    if (erro.code === '23505') {
      res.status(409).json({ error: 'Email já cadastrado.' });
      return;
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ error: 'Preencha todos os campos.' });
    return;
  }

  try {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    const usuario = resultado.rows[0];

    if (!usuario) {
      res.status(401).json({ error: 'Email ou senha inválidos.' });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      res.status(401).json({ error: 'Email ou senha inválidos.' });
      return;
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (erro) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}


export async function promoverAdmin(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: 'Email obrigatório.' });
        return;
    }

    try {
        const resultado = await pool.query(
            'UPDATE usuarios SET role = $1 WHERE email = $2 RETURNING id, nome, email, role',
            ['admin', email]
        );

        if (resultado.rows.length === 0) {
            res.status(404).json({ error: 'Usuário não encontrado.' });
            return;
        }

        res.json({ usuario: resultado.rows[0] });
    } catch (erro) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
import type { Request, Response } from "express";
import { cadastrarService, loginService, promoverAdminService } from "../services/authServices.js";


export async function cadastrar(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ error: 'Preencha todos os campos.' });
    return;
  }

  try {
    const usuario = await cadastrarService(nome, email, senha);
    res.status(201).json({ usuario });
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
    const token = await loginService(email, senha);
    res.json({ token });
  } catch (erro: any) {
    res.status(401).json({ error: erro.message });
  }
}


export async function promoverAdmin(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email obrigatório.' });
    return;
  }

  try {
    const usuario = await promoverAdminService(email);
    res.json({ usuario });
  } catch (erro: any) {
    res.status(404).json({ error: erro.message });
  }
}
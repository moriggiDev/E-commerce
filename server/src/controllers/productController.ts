import type { Request, Response } from 'express';
import {
  criarProdutoService,
  listarProdutosService,
  apagarProdutoService,
  listarProdutoPorIdService
} from '../services/productService.js';

export async function criarProduto(req: Request, res: Response) {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
    return;
  }

  try {
    const produto = await criarProdutoService(req.body);
    res.status(201).json({ produto });
  } catch (erro) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export async function listarProdutos(req: Request, res: Response) {
  const { filtro, busca, categoria } = req.query;

  try {
    const produtos = await listarProdutosService(
      filtro as string,
      busca as string,
      categoria as string
    );
    res.json({ produtos });
  } catch (erro) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export async function apagarProduto(req: Request, res: Response) {
  const id = req.params.id as string;

  try {
    await apagarProdutoService(id);
    res.json({ mensagem: 'Produto apagado com sucesso.' });
  } catch (erro: any) {
    if (erro.message === 'Produto não encontrado.') {
      res.status(404).json({ error: erro.message });
      return;
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export async function listarProdutoPorId(req: Request, res: Response) {
  const id = req.params.id as string;

  try {
    const produto = await listarProdutoPorIdService(id);
    res.json({ produto });
  } catch (erro: any) {
    console.log('Erro ao buscar produto:', erro.message); 
    if (erro.message === 'Produto não encontrado.') {
      res.status(404).json({ error: erro.message });
      return;
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
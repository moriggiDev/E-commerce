import type { Request, Response } from "express";
import pool from "../config/database.js";

export async function criarProduto(req: Request, res: Response) {
  const { nome, descricao, preco, estoque, vendas, popular, promocao, imagem, categoria } = req.body;

  if (!nome || !preco) {

    res.status(400).json({ error: "Nome e preço são obrigátorios." });
    return;
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco, estoque, vendas, popular, promocao, imagem, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nome, descricao, preco, estoque ?? 0, vendas ?? 0, popular ?? false, promocao ?? false, imagem ?? null, categoria ?? 'tecnologia']
    );
    res.status(201).json({ produto: resultado.rows[0] });
  } catch (erro) {
    res.status(500).json({ error: "Erro interno do servidor." })
  }

}

export async function listarProdutos(req: Request, res: Response) {
  const { filtro, busca } = req.query;

  let query = 'SELECT * FROM produtos WHERE 1=1';
  const valores: string[] = [];

  if (busca) {
    valores.push(`%${busca}%`);
    query += ` AND nome ILIKE $${valores.length}`;
  }

  if (filtro === 'mais-vendidos') {
    query += ' ORDER BY vendas DESC';
  } else if (filtro === 'populares') {
    query += ' AND popular = true';
  } else if (filtro === 'promocao') {
    query += ' AND promocao = true';
  } else {
    query += ' ORDER BY criado_em DESC';
  }

  try {
    const resultado = await pool.query(query, valores);
    res.json({ produtos: resultado.rows });
  } catch (erro) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}


export async function apagarProduto(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'DELETE FROM produtos WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rowCount === 0) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }

    res.json({ mensagem: "Produto apagado com sucesso." });
  } catch (erro) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

import type { Request, Response } from "express";
import pool from "../config/database.js";

export async function criarProduto(req: Request, res: Response) {
    const { nome, descricao, preco, estoque } = req.body;

    if(!nome || !preco) {
       
       res.status(400).json({ error: "Nome e preço são obrigátorios."});
        return;
    }

    try {
        const resultado = await pool.query(
            'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, descricao, preco, estoque ?? 0]
        );
        res.status(201).json({ produto: resultado.rows[0] });
    } catch (erro) {
        res.status(500).json({ error: "Erro interno do servidor."})
    }

}

export async function listarProduto(req: Request, res: Response) {
  try {
    const resultado = await pool.query(
      'SELECT * FROM produtos ORDER BY criado_em DESC'
    );
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

import pool from '../config/database.js';

// LÓGICA de criar produto
export async function criarProdutoService(dados: {
  nome: string;
  descricao: string;
  preco: number;
  estoque?: number;
  vendas?: number;
  popular?: boolean;
  promocao?: boolean;
  imagem?: string;
  categoria?: string;
}) {
  const { nome, descricao, preco, estoque, vendas, popular, promocao, imagem, categoria } = dados;

  const resultado = await pool.query(
    'INSERT INTO produtos (nome, descricao, preco, estoque, vendas, popular, promocao, imagem, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [nome, descricao, preco, estoque ?? 0, vendas ?? 0, popular ?? false, promocao ?? false, imagem ?? null, categoria ?? 'tecnologia']
  );

  return resultado.rows[0];
}

// LÓGICA de listar produtos com filtros
export async function listarProdutosService(filtro?: string, busca?: string, categoria?: string) {
  let query = 'SELECT * FROM produtos WHERE 1=1';
  const valores: string[] = [];

  if (categoria) {
    valores.push(categoria);
    query += ` AND categoria = $${valores.length}`;
  }

  if (busca) {
    valores.push(`%${busca}%`);
    query += ` AND nome ILIKE $${valores.length}`;
  }

  if (filtro === 'populares') {
    query += ' AND popular = true';
  } else if (filtro === 'promocao') {
    query += ' AND promocao = true';
  }

  
  if (filtro === 'mais-vendidos') {
    query += ' ORDER BY vendas DESC';
  } else {
    query += ' ORDER BY criado_em DESC';
  }
  const resultado = await pool.query(query, valores);
  return resultado.rows;
}

// LÓGICA de apagar produto
export async function apagarProdutoService(id: string) {
  const resultado = await pool.query(
    'DELETE FROM produtos WHERE id = $1 RETURNING *',
    [id]
  );

  if (resultado.rowCount === 0) {
    throw new Error('Produto não encontrado.');
  }

  return true;
}

// LÓGICA de buscar produto por id
export async function listarProdutoPorIdService(id: string) {
  const resultado = await pool.query(
    'SELECT * FROM produtos WHERE id = $1',
    [id]
  );

  if (resultado.rowCount === 0) {
    throw new Error('Produto não encontrado.');
  }

  return resultado.rows[0];
}
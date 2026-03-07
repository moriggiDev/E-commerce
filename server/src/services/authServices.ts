import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';


//Logica sem req, res
export async function cadastrarService(nome: string, email: string, senha: string) {
  const senhaHash = await bcrypt.hash(senha, 10);
  const resultado = await pool.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
    [nome, email, senhaHash]
  );
  return resultado.rows[0];
}


//Logica login: só retorna token
export async function loginService(email: string, senha: string) {
  const resultado = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  const usuario = resultado.rows[0];

  if (!usuario) {
    throw new Error('Email ou senha inválidos.');
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error('Email ou senha inválidos.');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, role: usuario.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );

  return token;
}



//Logica promover admin
export async function promoverAdminService(email: string) {
  const resultado = await pool.query(
    'UPDATE usuarios SET role = $1 WHERE email = $2 RETURNING id, nome, email, role',
    ['admin', email]
  );

  if (resultado.rows.length === 0) {
    throw new Error('Usuário não encontrado.');
  }

  return resultado.rows[0];
}

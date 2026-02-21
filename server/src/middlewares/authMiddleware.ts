import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).usuario = decoded;
    next();
  } catch (erro) {
    res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}
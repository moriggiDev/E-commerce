import express from 'express';
import './config/database.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/produtos', productRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
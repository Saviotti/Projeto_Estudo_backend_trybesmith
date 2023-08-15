import express from 'express';
import productsRouter from './routes/products.route';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);

export default app;

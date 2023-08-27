import express from 'express';
import loginRouter from './routes/login.route';
import orderRouter from './routes/orders.route';
import productsRouter from './routes/products.route';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

export default app;

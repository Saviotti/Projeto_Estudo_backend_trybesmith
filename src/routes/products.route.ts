import { Router } from 'express';
import productsController from '../Controller/products.controller';

const productsRouter = Router();
productsRouter.post('/', productsController.create);

export default productsRouter;
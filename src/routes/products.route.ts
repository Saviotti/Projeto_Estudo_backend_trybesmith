import { Router } from 'express';
import productsController from '../Controller/products.controller';

const productsRouter = Router();
productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.getAll);

export default productsRouter;
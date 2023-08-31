import { Router } from 'express';
import productsController from '../Controller/products.controller';
import nameValidation from '../Middlewares/name.validations';
import priceValidation from '../Middlewares/price.validation';

const productsRouter = Router();
productsRouter.post('/', nameValidation, priceValidation, productsController.create);
productsRouter.get('/', productsController.getAll);

export default productsRouter;
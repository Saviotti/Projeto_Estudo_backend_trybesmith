import { Router } from 'express';
import ordersController from '../Controller/orders.controller';
import productsValidation from '../Middlewares/products.validation';
import tokenValidation from '../Middlewares/token.validation';
import userValidation from '../Middlewares/user.validation';

const orderRouter = Router();
orderRouter.get('/', ordersController.getAll);
orderRouter.post('/', tokenValidation, userValidation, productsValidation, ordersController.create);
export default orderRouter;
import { Router } from 'express';
import ordersController from '../Controller/orders.controller';

const orderRouter = Router();
orderRouter.get('/', ordersController.getAll);

export default orderRouter;
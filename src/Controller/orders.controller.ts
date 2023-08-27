import { Request, Response } from 'express';
import ordersService from '../Service/orders.service';

const getAll = async (_req: Request, res: Response): Promise<Response> => {
  const orders = await ordersService.getAll();
  return res.status(200).json(orders.data);
};

export default {
  getAll,
};
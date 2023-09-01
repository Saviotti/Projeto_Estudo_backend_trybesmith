import { Request, Response } from 'express';
import ordersService from '../Service/orders.service';

const getAll = async (_req: Request, res: Response): Promise <Response> => {
  const orders = await ordersService.getAll();
  return res.status(200).json(orders.data);
};

const create = async (req: Request, res: Response): Promise <number | Response> => {
  const { userId, productIds } = req.body;
  const newOrder = await ordersService.create(userId, productIds);
  console.log(newOrder);
  return res.status(201).json(newOrder);  
};

export default {
  getAll,
  create,
};
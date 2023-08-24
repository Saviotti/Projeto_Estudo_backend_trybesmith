import { Request, Response } from 'express';
import productsService from '../Service/products.service';

const create = async (req: Request, res: Response): Promise<Response> => {
  const { name, price, orderId } = req.body;
  const products = await productsService.create({ name, price, orderId });
  return res.status(201).json(products);
};

const getAll = async (req: Request, res: Response): Promise<Response> => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

export default {
  create,
  getAll,
};
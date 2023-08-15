import { Request, Response } from 'express';
import productsService from '../Service/products.service';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const products = await productsService.create({ name, price, orderId });
  return res.status(201).json(products);
}

export default {
  create,
};
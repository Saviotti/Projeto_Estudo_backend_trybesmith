import { Product } from '../types/Product';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

async function create(product: ProductInputtableTypes): Promise<Product> {
  const addProduct = await ProductModel.create(product);
  return addProduct.dataValues;
}

export default {
  create,
};
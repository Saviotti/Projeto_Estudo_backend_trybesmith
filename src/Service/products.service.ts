import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';

const create = async (product: ProductInputtableTypes): Promise<ProductSequelizeModel> => {
  const addProduct = await ProductModel.create(product);
  return addProduct;
};

export default {
  create,
};
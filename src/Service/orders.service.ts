import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

const getAll = async (): Promise<ServiceResponse<object>> => {
  const orders = await OrderModel.findAll({
    include: [{ 
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'] }],
  });
  const mapIdOrders = orders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((products) => products.id),
  }));
  return { status: 'SUCCESSFULL', data: mapIdOrders };
};

const create = async (userId: number, productIds: number[]): Promise <unknown> => {
  const newOrder = await OrderModel.create({ userId });
  const updProducts = productIds.map((prodId) => ProductModel.update({
    orderId: newOrder.dataValues.id }, { where: { id: prodId } }));
  await Promise.all(updProducts);
  return { userId, productIds };
};

export default {
  getAll,
  create,
};
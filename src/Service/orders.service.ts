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

export default {
  getAll,
};
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa se renderiza todas as ordens com os ids', async function () {

    const orders = [
      {
        "id": 1,
        "userId": 1,
        "productIds": [
          {
            "id": 1,
            "name": "Excalibur",
            "price": "10 peças de ouro",
            "orderId": 1
          },
          {
            "id": 2,
            "name": "Espada Justiceira",
            "price": "20 peças de ouro",
            "orderId": 1
          },
        ]
      },
      {
        "id": 2,
        "userId": 2,
        "productIds": [
          {
            "id": 1,
            "name": "Excalibur",
            "price": "10 peças de ouro",
            "orderId": 2
          },
          {
            "id": 2,
            "name": "Espada Justiceira",
            "price": "20 peças de ouro",
            "orderId": 2
          },
        ]
      },
    ];

    const orderInstance = OrderModel.bulkBuild(orders);

    sinon.stub(OrderModel, 'findAll').resolves(orderInstance);
      
    const response = await chai.request(app).get('/orders');
    expect(response.status).to.equal(200);
  })

});

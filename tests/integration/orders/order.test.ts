import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);
const {expect} = chai;

describe('Testes do endpoint /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa retorno de getAll com mock', async function () {
    const allOrders = [
      { id: 1, userId: 1, productIds: [ 1, 2 ] },
      { id: 2, userId: 3, productIds: [ 3, 4 ] },
      { id: 3, userId: 2, productIds: [ 5 ] }
    ];

    const orderProductIds = [
      [{ id: 1}, { id: 2}],
      [{ id: 3}, { id: 4}],
      [{ id: 5}]
    ];

    const getOrdersFromDB = [
      {
        id: 1,
        userId: 1,
      },
      {
        id: 2,
        userId: 3,
      },
      {
        id: 3,
        userId: 2,
      }
    ];

    const mockFindAllReturn = getOrdersFromDB.map((order) => OrderModel.build(order));
    mockFindAllReturn.forEach((order, i) => order.dataValues.productIds = orderProductIds[i]);

    sinon.stub(OrderModel, 'findAll').resolves(mockFindAllReturn);

    const httpResponse = await chai.request(app).get('/orders');
    

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(allOrders);
  });

  it('Testa resposta sem um token', async function async () {
    const mock = { productsId: [1, 2] };

    const result = await chai.request(app).post('/orders').send(mock);

    expect(result.status).to.equal(401);
    expect(result.body.message).to.be.deep.equal('Token not found');
  });
  it('Testa resposta com um token inválido', async function async () {
    const mock = { productsId: [1, 2] };

    const result = await chai.request(app).post('/orders').send(mock).set('Authorization', 'Bearer 123');

    expect(result.status).to.equal(401);
    expect(result.body.message).to.be.deep.equal('Invalid token');
  });

  it('Testa resposta ao retorno da função create de service', async function () {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

    const dataBuild = OrderModel.build({ id: 5, userId: 1 });
    const mockResult = {
      userId: 1,
      productIds: [
        1,
        2
      ]
    }
    const mockUserId = { userId: 1, productIds: [1, 2] }
  
    sinon.stub(OrderModel, 'create').resolves(dataBuild);

    const response = await chai.request(app).post('/orders').send(mockUserId).set('Authorization', token);

    expect(response.body).to.be.deep.equal(mockResult);
    expect(response.status).to.equal(201);
  });
});

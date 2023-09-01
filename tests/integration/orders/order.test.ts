import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import { request } from 'http';
// import request from 'supertest'

chai.use(chaiHttp);
const {expect} = chai;

describe('Testes do endpoint /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se traz as ordens com o getAll', async function () {
    const findAllSinonStub = sinon.stub(OrderModel, 'findAll');
    findAllSinonStub.resolves([]);

    const response = await chai.request(app).get('/orders');

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal([]);
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
});

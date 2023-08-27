import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa se renderiza os produtos ao chamá-los', async () => {

  const productList = {
    id: 4,
    name: 'Martelo da Barbie',
    price: '50 peças de ouro',
    orderId: 4
  }

  const mockedProduct = ProductModel.build(productList);
  sinon.stub(ProductModel, 'findAll').resolves([mockedProduct]);

  const response = await chai.request(app).get('/products');

  expect(response).to.have.status(200);
  expect(response.body).to.be.deep.equal([mockedProduct.dataValues]);

  })
});

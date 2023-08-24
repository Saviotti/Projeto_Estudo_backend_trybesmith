import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Ao enviar um comando para novo cadastro, testa se um novo produto é criado', async function () {

    const mockedProduct = ProductModel.build({ name: 'Martelo da Barbie', price: '100', orderId: 4 });

    sinon.stub(ProductModel, 'create').resolves(mockedProduct);

    const response = await chai.request(app).post('/products').send({ name: 'Martelo da Barbie', price: '100', orderId: 4 });

    expect(response).to.have.status(201);
  });
});

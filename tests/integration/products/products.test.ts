import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Testes nos endpoint /products', function () {
  beforeEach(function () { sinon.restore(); });

  it('Ao enviar um comando para novo cadastro, testa se um novo produto é criado', async function () {

    const mockObj = {
      name: 'Martelo da Barbie', price: '100', orderId: 4
    }

    const mockedProduct = ProductModel.build(mockObj);

    sinon.stub(ProductModel, 'create').resolves(mockedProduct);

    const response = await chai.request(app).post('/products').
    send({ name: 'Martelo da Barbie', price: '100', orderId: 4 });

    expect(response).to.have.status(201);
  });
  it('Testa se chama os produtos com o getAll', async function () {
    const mockResult = [
      {
        id: 1,
        name: 'Espada do mal',
        price: '10',
        orderId: 4
      },
      {
        id: 2,
        name: 'Espada do mal braba',
        price: '101',
        orderId: 4
      },
    ];
    const findStub = sinon.stub(ProductModel, 'findAll');

    findStub.resolves(mockResult.map((item) => ProductModel.build(item)));
    const response = await chai.request(app).get('/products');
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(mockResult);
  })
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
  
  });
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
  
  });
});

import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('Teste do endpoint /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa resposta quando não é informado um username', async function () {
    const mock = {
        username: '',
        password: 'terrível'
    };

    const result = await chai.request(app).post('/login').send(mock);

    expect(result.status).to.equal(400);
    expect(result.body.message).to.be.deep.equal('"username" and "password" are required');
  });
  it('Testa resposta quando não é informado um password', async function () {
    const mock = {
        username: 'Marcus',
        password: ''
      }
    const result = await chai.request(app).post('/login').send(mock);

    expect(result.status).to.equal(400);
    expect(result.body.message).to.be.deep.equal('"username" and "password" are required');
  });
  it('Testa resposta quando username é inválido', async function () {
    const mock = {
        username: 'invalid-username',
        password: 'terrível'
      }
    sinon.stub(UserModel, 'findOne').resolves(undefined);
    const result = await chai.request(app).post('/login').send(mock);

    expect(result.status).to.equal(401);
    expect(result.body.message).to.be.deep.equal('Username or password invalid');
  });
  it('Testa resposta quando password é inválido', async function () {
    const mock = {
        username: 'Hagar',
        password: 'invalid-password'
      }
    sinon.stub(UserModel, 'findOne').resolves(undefined);
    
    const result = await chai.request(app).post('/login').send(mock);

    expect(result.status).to.equal(401);
    expect(result.body.message).to.be.deep.equal('Username or password invalid');
  });
  it('Testa status quando password e username são válidos', async function () {
    const mock = {
      username: 'Hagar',
      password: 'terrível'
   }
  sinon.stub(UserModel, 'findOne').resolves({ dataValues: { password: '$2a$10$.w9B4IXZBxZ6VD7M4Dwu3u68GSNyn3wYtM9EHkh7Ap/JGV4tDTyq2', username: 'Hagar' }} as any);

  const result = await chai.request(app).post('/login').send(mock);

  expect(result.status).to.equal(200);
  });
});

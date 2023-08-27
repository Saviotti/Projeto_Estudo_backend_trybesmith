import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';
import loginService from '../../../src/Service/login.service';


chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa resposta quando password e username está incorretos', async function () {

    const mockLogin = {
      id: 1,
      username: 'Marcus',
      level: 12,
      vocation: 'Gamer',
      password: '132456'
    }

    const user = { password: 'eitaaa' };
    const userLoginMock = sinon.mock(loginService);

    const mockLoginRequired = UserModel.build(mockLogin);
    sinon.stub(UserModel, 'findOne').resolves(mockLoginRequired);

    const response = await chai.request(app).post('/login')
      .send({ username: mockLogin.username, password: 'mei tchan' });

    expect(response).to.have.status(401);
    userLoginMock.expects('login').once().withArgs(user).resolves({
      status: 400, message: '"username" and "password" are required'
    })
  })
  it('Testa o retorno do status 200 e o token gerado', async function () {
    const user = { username: 'marcus1', password: 'password1' };
    const loginMock = sinon.mock(loginService);
    loginMock.expects('login').once().withArgs(user).resolves({ status: 200, message: 'token' });
  })
  it('should return 400 when password is not provided', async function () {
    const user = { username: 'user1' };
    const loginMock = sinon.mock(loginService);
    loginMock.expects('login').once().withArgs(user).resolves({ status: 400, message: '"username" and "password" are required' });
  });
  it('should return 401 when username or password is invalid', async function () {
    const user = { username: 'user1', password: 'password1' };
    const loginMock = sinon.mock(loginService);

    loginMock.expects('login').once().withArgs(user).resolves({ status: 401, message: 'Username or password invalid' });
  });
  
});

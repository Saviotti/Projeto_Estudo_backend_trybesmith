import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);
const {expect} = chai;

describe('validações em products', async function () {
    beforeEach(function () { sinon.restore(); });
    it('Testa validação de produto sem nome', async function () {

        const mock = { name: '', price: '100' }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.deep.equal('"name" is required');
    });
    it('Testa validação de produto com o seu nome sendo string', async function () {

        const mock = { name: 1, price: '100' }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('"name" must be a string');
    });
    it('Testa validação de produto ao qual seu tamanho tenha pelo menos 3 caracteres', async function () {

        const mock = { name: 'Oi', price: '100' }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('"name" length must be at least 3 characters long');
    });
    it('Testa respostas se não tiver o price', async function () {
        const mock = {
            name: 'Martelo de Thor',
            price: '',
            orderId: 4
        }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.deep.equal('"price" is required');
    });
    it('Testa respostas se o tipo de price for diferente de string', async function () {
        const mock = {
            name: 'Martelo de Thor',
            price: 10,
            orderId: 4
        }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('"price" must be a string');
    });
    it('Testa respostas quando price tem menos de 2 caracteres', async function () {
        const mock = {
            name: 'Martelo de Thor',
            price: 'oi',
            orderId: 4
        }
        const result = await chai.request(app).post('/products').send(mock);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('\"price\" length must be at least 3 characters long');
    });
    it('Testa respostas se não tiver o userID', async function () {

        const mock = { userId: '', productIds: [1, 2] }
        const result = await chai.request(app).post('/orders').send(mock);

        expect(result.status).to.equal(401);
        expect(result.body.message).to.be.deep.equal('Token not found');
    });
    it('Testa respostas se o tipo de userId for diferente de number', async function () {

        const mock = { userId: 'string', productIds: [1, 2] }
        const result = await chai.request(app).post('/orders').send(mock);

        expect(result.status).to.equal(401);
        expect(result.body.message).to.be.deep.equal('Token not found');
    });
    it('Testa se o userId é um usuário existente', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: '', productIds: [1] }
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.deep.equal('"userId" is required');
    });
    it('Testa a resposta do userId se não for do tipo number', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: 'string', productIds: [1] }
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('\"userId\" must be a number');
    });
    it('Testa a resposta do userId quando não é uma pessoa usuária válida', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: 10, productIds: [1, 2] };
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(404);
        expect(result.body.message).to.be.deep.equal('"userId" not found');
    });
    it('Testa a resposta do productsId quando não há produto no corpo da requisição', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: 1 };
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(400);
        expect(result.body.message).to.be.deep.equal('"productIds" is required');
    });
    it('Testa a resposta do productsId quando o corpo da requisição de products não for um array', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: 1, productIds: {} };
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('"productIds" must be an array');
    });
    it('Testa a resposta do productsId quando o corpo da requisição for um array vazio', async function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzU5OTY3N30.pHID9a9Je9CHv8rOd62-1YmewUKWTDtQkwaDay2sKEY';

        const mock = { userId: 1, productIds: [] };
        const result = await chai.request(app).post('/orders').send(mock).set('Authorization', token);

        expect(result.status).to.equal(422);
        expect(result.body.message).to.be.deep.equal('"productIds" must include only numbers');
    });
})

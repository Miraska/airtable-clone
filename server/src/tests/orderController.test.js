const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { Order } = require('../models/entities');

chai.use(chaiHttp);
const { expect } = chai;

describe('Order Controller', () => {
  let orderId;

  before(async () => {
    const order = await Order.create({ status: 'new', order_number: 12345, client_inn: '1234567890' });
    orderId = order.id;
  });

  it('should get all orders', (done) => {
    chai.request(app)
      .get('/api/orders')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get order by ID', (done) => {
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id', orderId);
        done();
      });
  });

  it('should create a new order', (done) => {
    chai.request(app)
      .post('/api/orders')
      .send({ status: 'in_progress', order_number: 67890, client_inn: '9876543210' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('order_number', 67890);
        done();
      });
  });

  it('should update an existing order', (done) => {
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .send({ status: 'completed' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'completed');
        done();
      });
  });

  it('should delete an order', (done) => {
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Order deleted successfully');
        done();
      });
  });
});

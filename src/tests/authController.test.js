const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { User } = require('../models/entities');
const bcrypt = require('bcrypt');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller', () => {
  before(async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    await User.create({ username: 'testuser', password: hashedPassword });
  });

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({ username: 'newuser', password: 'newpassword' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('username', 'newuser');
        done();
      });
  });

  it('should log in a user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('accessToken');
        done();
      });
  });
});

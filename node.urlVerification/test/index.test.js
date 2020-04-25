'use strict'

var request = require('supertest');
const app = require('../index');

describe('POST /api/v1/checkAddress', function() {
    it('should respond with status code 500', async () => {
		await request(app)
        .post('/api/v1/checkAddress')
        .send({"url":"https://www.google.come"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
            if (err) return done(err);
          });
    });
    
    it('should respond with status code 200', async () => {
      await request(app)
          .post('/api/v1/checkAddress')
          .send({"url":"https://www.google.com"})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
              if (err) return done(err);
            });
      });
})
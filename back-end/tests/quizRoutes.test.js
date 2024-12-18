const request = require('supertest');
const app = require('../app');
const Quiz = require('../models/quizModel');

describe('Quiz Routes', () => {
  it('should fetch leaderboard', async () => {
    const res = await request(app)
      .get('/quiz/123/leaderboard')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch quiz analytics', async () => {
    const res = await request(app)
      .get('/quiz/123/analytics')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalAttempts');
    expect(res.body).toHaveProperty('averageScore');
  });
});


it('should fetch user-specific performance data', async () => {
  const res = await request(app)
    .get('/user/performance')
    .set('Authorization', `Bearer ${userToken}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


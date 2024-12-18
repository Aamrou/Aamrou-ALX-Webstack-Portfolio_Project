it('should fetch all quizzes for admin', async () => {
  const res = await request(app)
    .get('/admin/quizzes')
    .set('Authorization', `Bearer ${adminToken}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

it('should delete a quiz', async () => {
  const quizId = 'some-quiz-id';
  const res = await request(app)
    .delete(`/admin/quiz/${quizId}`)
    .set('Authorization', `Bearer ${adminToken}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Quiz deleted successfully');
});


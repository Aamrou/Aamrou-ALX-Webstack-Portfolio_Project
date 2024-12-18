import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../components/AdminDashboard';

test('renders admin dashboard with quizzes', async () => {
  render(<AdminDashboard />);
  const heading = await screen.findByText(/Admin Dashboard/i);
  expect(heading).toBeInTheDocument();
});

test('deletes a quiz when delete button is clicked', async () => {
  render(<AdminDashboard />);
  const deleteButton = await screen.findByText(/Delete/i);
  fireEvent.click(deleteButton);
  const deletedQuiz = await screen.queryByText(/Some Quiz Title/i);
  expect(deletedQuiz).toBeNull();
});


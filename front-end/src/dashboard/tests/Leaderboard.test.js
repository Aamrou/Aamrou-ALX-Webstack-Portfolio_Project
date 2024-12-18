import { render, screen } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';

test('renders leaderboard table', async () => {
  render(<Leaderboard quizId="123" />);
  const heading = await screen.findByText(/Leaderboard/i);
  expect(heading).toBeInTheDocument();
});


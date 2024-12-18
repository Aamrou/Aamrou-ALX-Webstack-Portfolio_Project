import { render, screen } from '@testing-library/react';
import UserPerformance from '../components/UserPerformance';

test('renders user performance table', async () => {
  render(<UserPerformance />);
  const heading = await screen.findByText(/Your Performance/i);
  expect(heading).toBeInTheDocument();
});


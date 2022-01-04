import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello', () => {
  render(<App />);
  const linkElement = screen.getByText('Hello');
  expect(linkElement).toBeInTheDocument();
});

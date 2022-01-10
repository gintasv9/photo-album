import { render, screen } from '@testing-library/react';
import App from './Home';

test('renders instruction how to navigate', () => {
  render(<App />);
  const linkElement = screen.getByText('/albums/<Your id>');
  expect(linkElement).toBeInTheDocument();
});

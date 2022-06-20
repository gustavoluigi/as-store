import { render, screen } from '@testing-library/react';
import PageTitle from '../../components/PageTitle';

// TODO: test if component has children
test('should have exists and have content', () => {
  render(<PageTitle>Content</PageTitle>);
  // const pageTitleElement = screen.getByText('Content');
  const pageTitleElement = screen.getByRole('heading', { level: 2 });
  console.log(pageTitleElement.children);
  expect(pageTitleElement.children).not.toBeNull();
  expect(pageTitleElement).toHaveTextContent('Content');
});

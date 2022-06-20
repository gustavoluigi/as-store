import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import BackButton from '../../components/BackButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders component', async () => {
  render(<BackButton />);
  const btnElement = screen.getByRole('button');
  expect(btnElement).toBeInTheDocument();
});

test('handles onCLick', async () => {
  render(<BackButton />);
  const btnElement = screen.getByRole('button');
  const spyBtn = jest.spyOn(btnElement, 'click');
  btnElement.click();
  expect(spyBtn).toHaveBeenCalledTimes(1);
});

// TODO: Test if BackButton is navigating(https://www.tabnine.com/code/javascript/functions/history/createMemoryHistory)
test('check navigation', async () => {
  render(<BackButton />);
  const history = createMemoryHistory({ initialEntries: ['/'] });
  history.push('dashboard');
  const btnElement = screen.getByRole('button');
  const spyBtn = jest.spyOn(btnElement, 'click');
  btnElement.click();
  // fireEvent.click(btnElement);
  // expect(spyBtn).toHaveBeenCalledTimes(1);
  console.log(history.location.pathname);
});

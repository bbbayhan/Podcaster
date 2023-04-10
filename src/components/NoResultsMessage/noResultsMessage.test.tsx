import { render, screen } from '@testing-library/react';
import { NoResultsMessage } from './noResultsMessage';

describe('NoResultsMessage', () => {
  it('should render the "no results" message', () => {
    render(<NoResultsMessage />);
    const messageElement = screen.getByTestId('no-results-message');
    expect(messageElement).toBeInTheDocument();
  });
});

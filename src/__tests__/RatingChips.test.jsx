import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatingChips } from '../components/RatingChips/RatingChips';

describe('RatingChips', () => {
  it('renders 5 chips labelled 1 through 5', () => {
    render(<RatingChips selectedRating={null} onSelect={() => {}} disabled={false} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(`Rating ${i}`)).toBeInTheDocument();
    }
  });

  it('calls onSelect with the correct rating', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<RatingChips selectedRating={null} onSelect={onSelect} disabled={false} />);
    await user.click(screen.getByLabelText('Rating 3'));
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it('marks the active chip with aria-pressed=true', () => {
    render(<RatingChips selectedRating={2} onSelect={() => {}} disabled={false} />);
    expect(screen.getByLabelText('Rating 2')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Rating 1')).toHaveAttribute('aria-pressed', 'false');
  });

  it('disables all chips when disabled=true', () => {
    render(<RatingChips selectedRating={null} onSelect={() => {}} disabled={true} />);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});

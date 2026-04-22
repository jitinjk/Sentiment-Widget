import { render, screen } from '@testing-library/react';
import { SummaryPanel } from '../components/SummaryPanel/SummaryPanel';

const mockComments = [
  { rating: 5, comment: 'Great!', timestamp: 1 },
  { rating: 3, comment: 'Okay.', timestamp: 2 },
];

describe('SummaryPanel', () => {
  it('renders nothing when there are no submissions', () => {
    const { container } = render(
      <SummaryPanel totalSubmissions={0} averageRating={null} recentComments={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows total submissions and average rating', () => {
    render(
      <SummaryPanel totalSubmissions={2} averageRating="4.0" recentComments={mockComments} />
    );
    expect(screen.getByText(/Total submissions/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4.0')).toBeInTheDocument();
  });

  it('renders recent comment text', () => {
    render(
      <SummaryPanel totalSubmissions={2} averageRating="4.0" recentComments={mockComments} />
    );
    expect(screen.getByText(/"Great!"/)).toBeInTheDocument();
    expect(screen.getByText(/"Okay\."/)).toBeInTheDocument();
  });
});

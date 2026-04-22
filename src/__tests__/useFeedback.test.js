import { renderHook, act } from '@testing-library/react';
import { useFeedback } from '../hooks/useFeedback';

describe('useFeedback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initialises with empty state', () => {
    const { result } = renderHook(() => useFeedback());
    expect(result.current.selectedRating).toBeNull();
    expect(result.current.comment).toBe('');
    expect(result.current.submissions).toHaveLength(0);
  });

  it('selects a rating', () => {
    const { result } = renderHook(() => useFeedback());
    act(() => result.current.selectRating(4));
    expect(result.current.selectedRating).toBe(4);
  });

  it('shows error when submitting without a rating', () => {
    const { result } = renderHook(() => useFeedback());
    act(() => result.current.submit());
    expect(result.current.error).not.toBe('');
    expect(result.current.submissions).toHaveLength(0);
  });

  it('records a submission and shows confirmation', () => {
    const { result } = renderHook(() => useFeedback());
    act(() => result.current.selectRating(5));
    act(() => result.current.updateComment('Great!'));
    act(() => result.current.submit());

    expect(result.current.submissions).toHaveLength(1);
    expect(result.current.submissions[0].rating).toBe(5);
    expect(result.current.confirmation).toBe(true);
    expect(result.current.isDisabled).toBe(true);
  });

  it('re-enables widget after 3 seconds', () => {
    const { result } = renderHook(() => useFeedback());
    act(() => result.current.selectRating(3));
    act(() => result.current.submit());

    expect(result.current.isDisabled).toBe(true);
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.isDisabled).toBe(false);
    expect(result.current.confirmation).toBe(false);
  });

  it('computes average rating correctly', () => {
    const { result } = renderHook(() => useFeedback());
    act(() => result.current.selectRating(2));
    act(() => result.current.submit());
    act(() => vi.advanceTimersByTime(3000));
    act(() => result.current.selectRating(4));
    act(() => result.current.submit());
    act(() => vi.advanceTimersByTime(3000));

    expect(result.current.averageRating).toBe('3.0');
  });

  it('returns up to 3 recent comments', () => {
    const { result } = renderHook(() => useFeedback());

    for (let i = 1; i <= 4; i++) {
      act(() => result.current.selectRating(i));
      act(() => result.current.updateComment(`Comment ${i}`));
      act(() => result.current.submit());
      act(() => vi.advanceTimersByTime(3000));
    }

    expect(result.current.recentComments).toHaveLength(3);
  });
});

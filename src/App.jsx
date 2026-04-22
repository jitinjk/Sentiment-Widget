import { useFeedback } from './hooks/useFeedback';
import { RatingChips } from './components/RatingChips/RatingChips';
import { CommentBox } from './components/CommentBox/CommentBox';
import { SubmitButton } from './components/SubmitButton/SubmitButton';
import { SummaryPanel } from './components/SummaryPanel/SummaryPanel';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export default function App() {
  const {
    selectedRating,
    comment,
    submissions,
    isDisabled,
    confirmation,
    error,
    averageRating,
    recentComments,
    selectRating,
    updateComment,
    submit,
  } = useFeedback();

  return (
    <div className="page">
      <header className="page__header">
        <ThemeToggle />
      </header>

      <main className="widget" aria-label="Sentiment feedback widget">
        <h1 className="widget__title">Mini Sentiment Widget</h1>

        <RatingChips
          selectedRating={selectedRating}
          onSelect={selectRating}
          disabled={isDisabled}
        />

        {error && (
          <p className="widget__error" role="alert">{error}</p>
        )}

        <CommentBox
          value={comment}
          onChange={updateComment}
          disabled={isDisabled}
        />

        <SubmitButton onSubmit={submit} disabled={isDisabled} />

        {confirmation && (
          <p className="widget__confirmation" role="status">
            Thank you for your feedback.
          </p>
        )}

        {submissions.length > 0 && (
          <>
            <hr className="widget__divider" />
            <SummaryPanel
              totalSubmissions={submissions.length}
              averageRating={averageRating}
              recentComments={recentComments}
            />
          </>
        )}
      </main>
    </div>
  );
}

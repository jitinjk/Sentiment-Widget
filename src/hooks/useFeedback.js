import { useState, useCallback } from 'react';

const SPAM_COOLDOWN_MS = 3000;

export function useFeedback() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState('');

  const selectRating = useCallback((rating) => {
    if (isDisabled) return;
    setSelectedRating(rating);
    setError('');
  }, [isDisabled]);

  const updateComment = useCallback((value) => {
    setComment(value);
  }, []);

  const submit = useCallback(() => {
    if (!selectedRating) {
      setError('Please select a rating before submitting.');
      return;
    }

    const entry = {
      rating: selectedRating,
      comment: comment.trim(),
      timestamp: Date.now(),
    };

    setSubmissions((prev) => [entry, ...prev]);
    setConfirmation(true);
    setIsDisabled(true);
    setSelectedRating(null);
    setComment('');
    setError('');

    setTimeout(() => {
      setIsDisabled(false);
      setConfirmation(false);
    }, SPAM_COOLDOWN_MS);
  }, [selectedRating, comment]);

  const averageRating =
    submissions.length > 0
      ? (submissions.reduce((sum, s) => sum + s.rating, 0) / submissions.length).toFixed(1)
      : null;

  const recentComments = submissions
    .filter((s) => s.comment.length > 0)
    .slice(0, 3);

  return {
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
  };
}

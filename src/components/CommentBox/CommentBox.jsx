export function CommentBox({ value, onChange, disabled }) {
  return (
    <textarea
      className="comment-box"
      placeholder="Enter your comment (optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={4}
      aria-label="Comment"
    />
  );
}

export function SubmitButton({ onSubmit, disabled }) {
  return (
    <button
      type="button"
      className="submit-btn"
      onClick={onSubmit}
      disabled={disabled}
    >
      Submit
    </button>
  );
}

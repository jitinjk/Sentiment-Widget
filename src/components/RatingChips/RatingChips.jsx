const RATINGS = [1, 2, 3, 4, 5];

export function RatingChips({ selectedRating, onSelect, disabled }) {
  return (
    <div className="rating-chips" role="group" aria-label="Select a rating from 1 to 5">
      {RATINGS.map((rating) => (
        <button
          key={rating}
          type="button"
          className={`chip${selectedRating === rating ? ' chip--active' : ''}`}
          onClick={() => onSelect(rating)}
          disabled={disabled}
          aria-pressed={selectedRating === rating}
          aria-label={`Rating ${rating}`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}

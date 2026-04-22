# Mini Sentiment Widget

A React SPA built with Vite.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Production URL (Hosted on S3) 

http://mini-sentiment-widget.s3-website-ap-southeast-2.amazonaws.com/

## Running tests

```bash
npm test              # single run
npm run test:watch    # watch mode
npm run test:coverage # with coverage report
```

## Building for production

```bash
npm run build
npm run preview
```

## Architecture & design decisions

### Component structure

| Component | Responsibility |
|-----------|---------------|
| `RatingChips` | Renders the 1–5 rating buttons; fully controlled, no internal state |
| `CommentBox` | Controlled textarea; delegates change events up |
| `SubmitButton` | Thin wrapper; disabled state driven by parent |
| `SummaryPanel` | Pure display; renders nothing until at least one submission exists |
| `ThemeToggle` | Reads/writes theme via context |

### State management

All feedback state lives in a single custom hook `useFeedback` (`src/hooks/useFeedback.js`). This keeps `App.jsx` as a composition root only and makes the logic independently testable without rendering.

### Theme

A `ThemeContext` persists the user's preference in `localStorage` and syncs a `data-theme` attribute on `<html>`. CSS custom properties handle all theming with no JS style injection or third-party library.

### Spam prevention

After a successful submission the hook sets `isDisabled=true` and schedules a 3-second timeout to re-enable interaction. All child components receive `disabled` as a prop so they cannot be circumvented independently.

### Styling

Plain CSS with custom properties (no CSS-in-JS, no Tailwind).

## Deployment (AWS)

Deploy the `dist/` folder to AWS S3:

```bash
npm run build
aws s3 sync dist/ s3://<your-bucket> --delete
```

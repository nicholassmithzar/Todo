# Todo Management

Angular application that consumes JSONPlaceholder users and todos endpoints, supports local todo creation, and demonstrates clear state management with Angular signals.

## Quick Start

```bash
npm install
npm run start
```

Open http://localhost:4200 in your browser.

## Tech Stack

- Angular 21 (standalone components + lazy routes)
- PrimeNG + PrimeIcons
- RxJS
- Unit tests with Angular test runner (Vitest)
- End-to-end tests with Playwright

## API Endpoints

- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/todos

## Features

- Users list with loading and error states
- User selection with user-specific todo rendering
- Empty state handling for todos
- Local todo creation assigned to selected user
- Newly created local todo appears at the top of list
- Responsive layout for desktop and mobile

## Project Structure

- src/app/views/users: users feature (list, details, local todo form)
- src/app/views/dashboard: dashboard feature
- src/app/components/navbar: app navigation
- tests/e2e: Playwright end-to-end scenarios

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npm run start
```

3. Open in browser

- http://localhost:4200

## Testing

### Unit Tests

Run once:

```bash
npm run test -- --watch=false
```

### End-to-End Tests (Playwright)

Install browser binary (first time only):

```bash
npx playwright install chromium
```

Run all e2e tests:

```bash
npm run test:e2e
```

Run headed mode:

```bash
npm run test:e2e:headed
```

Run UI mode:

```bash
npm run test:e2e:ui
```

Open HTML report:

```bash
npm run test:e2e:report
```

## State Management Approach

State is managed with Angular signals in feature components:

- Personally speaking this is a very big contestation part of the any application because it can be very convoluted therefore simple is always best,
- Source state: users, todos, selected user id, loading, error, form input
- Derived state: selected user, filtered user todos, form validity
- Updates happen through explicit methods (loadData, selectUser, createLocalTodo)

This keeps state predictable and easy to trace without introducing a global store for this project size.

## Notable Decisions

- Kept API access in feature services and state in components for clarity
- Leaned on PrimeNG components for minimal wheel-reinvention
- Use BEM for style leak prevention
- Used computed signals for derived data (selected user, user todos)
- Used local-only, for todo creation without persisting to API
- Added test ids in Users view to make e2e assertions stable and less brittle

## Accessibility Notes

- Uses semantic sections, headings, table structure, form and labels via clear placeholders/title context
- Loading and error states are visible and explicit
- Areas to improve over time:
	- stronger keyboard interactions for row selection
	- additional ARIA attributes for richer assistive feedback,
  - Tooltips and cursor/pointer indicators

## Things Worth Improving over Time

- A more fleshed out UX for better usability
- Add dedicated route for user detail (for example users/:id) making app more comsumable
- Add more tests for error and empty edge cases  
- Add request cancellation/race protection on rapid refresh actions


## Scripts

- npm run start
- npm run build
- npm run test
- npm run test:e2e
- npm run test:e2e:headed
- npm run test:e2e:ui
- npm run test:e2e:report

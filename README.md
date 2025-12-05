# shop-explorer

A simple web application to explore shops — built with React + TypeScript + Vite + Tailwind CSS.

## Overview

This project aims to provide a minimal, clean starting point for a shop-exploring web app. It uses modern web tooling (React, TypeScript, Vite, and Tailwind CSS) for fast development & build times.  
The goal is to let developers quickly spin up a working UI scaffold for a shop explorer — from cloning to viewing in browser — and then extend it with more shop-data, UI, or backend integration.  

## Features

- React + TypeScript for type-safe UI development  
- Vite as build tool for fast development and optimized bundling  
- Tailwind CSS v4 for rapid and consistent styling  
- **Vitest + React Testing Library** for component testing  
- Clean project structure  
- Ready to be extended with API integration, routing, and state management  

## Getting Started (Setup)

### Prerequisites

Make sure you have:

- Node.js v14+  
- npm or yarn  

### Installation

## Setup

1. Clone the repository
```bash
git clone https://github.com/18mson/shop-explorer.git

cd shop-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server (Vite):

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build locally:

```bash
npm run preview
```

Optional checks:

- TypeScript type-check only (no emit):

```bash
npx tsc --noEmit
```

- Run the linter (if configured in `package.json`):

```bash
npm run lint
```

## Testing

This project uses **Vitest** for unit and component testing, along with **React Testing Library** for testing React components.

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode (re-run on file changes):

```bash
npm test -- --watch
```

Run tests with UI dashboard:

```bash
npm run test:ui
```

Run tests with coverage report:

```bash
npm test -- --coverage
```

### Test Structure

Tests are organized in `__tests__` folders next to the component files they test:

```
src/
├── components/
│   ├── Layout.tsx
│   └── __tests__/
│       └── Layout.test.tsx
```

### Example Test

The `Layout` component includes a sample test suite (`src/components/__tests__/Layout.test.tsx`) that demonstrates:

- Rendering components with required providers (BrowserRouter, CartProvider)
- Mocking custom hooks using `vi.mock()`
- Querying elements with Testing Library utilities
- Asserting element presence and attributes
- Testing DOM class presence and styling

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout Component', () => {
  it('should render the header with Shop Explorer title', () => {
    render(<Layout />);
    expect(screen.getByText('Shop Explorer')).toBeInTheDocument();
  });
});
```

### Writing New Tests

1. Create a `__tests__` folder in the component directory
2. Create a `.test.tsx` file with the same name as your component
3. Import testing utilities and your component
4. Write test cases using `describe`, `it`, and `expect`

### Key Testing Tools

- **Vitest**: Fast, ESM-first unit testing framework
- **React Testing Library**: User-centric testing utilities for React
- **@testing-library/jest-dom**: Custom DOM matchers (e.g., `toBeInTheDocument`, `toHaveClass`)
- **jsdom**: Virtual DOM environment for browser APIs in tests

## Approach & Decisions

React + TypeScript + Vite
Chosen to provide a modern, fast, and type-safe frontend development environment. Vite ensures very fast dev server startup and efficient builds.

Tailwind CSS v4
Tailwind v4 is used because it makes UI development faster, more consistent, and easier to maintain. Utility-first styling removes the need for writing repetitive custom CSS and speeds up layout and responsive design. The setup is lightweight and scales well as the project grows.

Vitest + React Testing Library 
Used for unit and component testing to ensure UI reliability and predictable behavior. Vitest is fast and integrates perfectly with Vite, while React Testing Library focuses on testing user behavior rather than implementation details. This helps maintain confidence when refactoring or adding features.


Minimal Architectures First
The project is intentionally kept simple at the start to focus on clean structure, flexibility, and performance. State management, routing, and API logic can be added incrementally as features grow.

Scalable Folder Structure
Components and pages are separated early to ensure the project remains easy to maintain as the codebase grows.

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── context/          # context providers
├── pages/            # Page level components
├── services/         # API and utility services
├── types/            # TypeScript type definitions
├── main.tsx          # Entry point
```

## Features

- Responsive design with Tailwind CSS
- Type-safe code with TypeScript
- Fast development with Vite
- Modular and scalable architecture


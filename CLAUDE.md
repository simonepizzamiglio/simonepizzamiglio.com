# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 application with server-side rendering, TypeScript, and TailwindCSS v4. The project uses Vite as the build tool.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server with HMR
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run type checking
bun run typecheck

# Run lint
bun run lint

# Run lint with auto-fix
bun run lint:fix

# Run formatter
bun run format

# Run tests
bun run test
```

The development server runs at `http://localhost:5173`.

## Architecture

### Routing Structure

- Uses file-based routing with routes defined in `app/routes.ts`
- Route files are located in `app/routes/` directory
- Blog posts are MD files in `content/blog/` processed dynamically

### Key Directories

- `app/` - Main application code including routes, components, and styles
- `app/components/` - Reusable components (includes shadcn/ui components)
- `app/routes/` - Route components
- `app/data/` - Static data files for projects
- `content/blog/` - Blog posts in MD format
- `public/` - Static assets

### UI Components

- Uses shadcn/ui component library with "new-york" style variant
- Components configured in `components.json` with path aliases
- TailwindCSS v4 for styling with CSS variables enabled
- Lucide React for icons

### TypeScript Configuration

- Strict TypeScript setup with path aliases (`~/*` maps to `./app/*`)
- Type generation via `react-router typegen`
- Uses ES2022 target with bundler module resolution

### Content Management

- Blog posts and project data stored in TypeScript files for type safety
- Server-side rendering enabled by default (configurable in `react-router.config.ts`)

### Linting

- Linting configuration is configured in `./eslint.config.ts`

### Git Hooks

- Uses Husky for Git hooks
- Pre-commit hook automatically runs:
  - `bun run format` - Code formatting
  - `bun run lint:fix` - Linting with auto-fix
  - `bun run typecheck` - TypeScript type checking
  - `bun run test` - Test suite

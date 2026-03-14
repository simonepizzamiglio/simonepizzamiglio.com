# AGENTS.md

This file provides guidelines for AI coding agents working in this repository.

## Project Overview

This is an Astro 5 blog/website project with TypeScript, TailwindCSS v4, and DaisyUI. The project uses content collections for blog posts, RSS feeds, and sitemap generation.

## Build/Lint/Test Commands

Run all commands from the project root:

| Command             | Action                                       |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Start local dev server at `localhost:4321`   |
| `pnpm build`        | Build production site to `./dist/`           |
| `pnpm preview`      | Preview production build locally             |
| `pnpm astro ...`    | Run Astro CLI commands (e.g., `astro check`) |
| `pnpm format`       | Format code with Prettier                    |
| `pnpm format:check` | Check formatting without changing files      |
| `pnpm lint`         | Run ESLint                                   |
| `pnpm lint:fix`     | Auto-fix ESLint issues                       |

## Code Style Guidelines

### Formatting (Prettier)

- **Indentation**: Tabs (2 space width)
- **Semicolons**: None
- **Quotes**: Double quotes
- **Trailing commas**: ES5 style
- **Print width**: 80 characters
- **Arrow function parentheses**: Always
- **Line endings**: LF

### TypeScript Configuration

- `strictNullChecks: true` is enabled
- All .astro, .ts, and .tsx files are type-checked

### ESLint Configuration

- Uses TypeScript ESLint parser for .ts/.tsx files
- Uses Astro ESLint parser for .astro files
- Includes jsx-a11y plugin for accessibility rules
- `astro/no-set-html-directive` is intentionally disabled
- Prettier config handles formatting (no conflicts with ESLint)

### Naming Conventions

- **Components**: PascalCase (`Header`, `Footer`, `BlogPost`)
- **Component files**: PascalCase (`Header.astro`, `BaseHead.astro`)
- **Pages**: kebab-case routes (`blog/index.astro`, `[...slug].astro`)
- **Constants**: UPPER_SNAKE_CASE (`SITE_TITLE`, `SITE_DESCRIPTION`)
- **Functions/variables**: camelCase
- **Types/Interfaces**: PascalCase
- **Props interface**: Always named `Props`

### Import Order

1. Relative/local imports (components, styles, consts)
2. Astro built-in imports (`astro:content`, `astro:assets`, `astro/types`)
3. Third-party packages (`@lucide/astro`)

Example:

```ts
import Header from "../components/Header.astro"
import { getCollection } from "astro:content"
import { Github } from "@lucide/astro"
```

### Component Structure (.astro files)

Use the standard Astro fence pattern:

```astro
---
// Imports first
import type { HTMLAttributes } from "astro/types"
import Header from "./Header.astro"

// Define Props interface
interface Props {
	title: string
	date: Date
}

// Destructure props at top
const { title, date } = Astro.props
---

<!-- Template below -->
<Header />
<h1>{title}</h1>
```

### Content Collections

Blog posts live in `src/content/blog/` as .md or .mdx files. Frontmatter is type-validated through `src/content.config.ts` using Zod schemas:

```ts
export const collections = { blog }
```

Schema fields:

- `title`: string (required)
- `description`: string (required)
- `pubDate`: Date (coerced from string)
- `updatedDate`: Date (optional)
- `heroImage`: image (optional)

Use `getCollection("blog")` to fetch posts in pages.

### Styling

- **Global styles**: Defined in `src/styles/global.css`
- **TailwindCSS**: Available via `@tailwindcss/vite` plugin
- **DaisyUI**: Component classes available
- **Custom CSS**: Can be scoped in `<style>` tags within components
- **CSS variables**: Theme colors defined as CSS variables in `:root`

### Accessibility

- Use semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<article>`)
- Provide `aria-label` for icon-only links and decorative images
- Use `aria-hidden="true"` for decorative icons
- Ensure proper heading hierarchy
- Use `alt=""` for decorative images, meaningful alt text otherwise

### Type Safety

- Always define `Props` interface for components receiving props
- Use type assertions carefully (`type Props = CollectionEntry<"blog">["data"]`)
- Leverage Astro's built-in types (`HTMLAttributes<"a">`, `CollectionEntry`)

### Error Handling

- Use optional chaining and nullish coalescing for potentially undefined values
- Example: `const { image = FallbackImage } = Astro.props`
- Render conditional content with logical AND: `{heroImage && <Image src={heroImage} />}`

## Common Patterns

### Fetching and sorting blog posts:

```ts
const posts = (await getCollection("blog")).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
)
```

### Dynamic routes for blog posts:

```ts
export async function getStaticPaths() {
	const posts = await getCollection("blog")
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}))
}
```

### Conditional class names:

```ts
<a class:list={[className, 'base-class', isActive ? 'active-class' : '']} />
```

## Directory Structure

```
src/
├── components/     # Reusable Astro components
├── content/        # Markdown/MDX content (blog posts)
├── layouts/        # Page layout components
├── pages/          # File-based routing
├── styles/         # Global CSS
├── assets/         # Static assets (images, fonts)
├── consts.ts       # Global constants
└── content.config.ts # Content collection schemas
```

## Before Submitting

Always run:

- `pnpm lint` (or `pnpm lint:fix` if auto-fixable)
- `pnpm format:check` (or `pnpm format` if needed)
- `pnpm build` to ensure production build succeeds

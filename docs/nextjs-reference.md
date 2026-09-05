# Next.js reference notes

## Dynamic Routes

Source: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes

> **Dynamic Route Segments**
>
> A URL path is a sequence of path segments. In the App Router, a segment may be static (a literal value matched exactly) or dynamic (a placeholder that captures a value from the URL). When you don't know a segment's value ahead of time, define a Dynamic Segment to create routes from dynamic data. Next.js passes the captured values to your page via the path params prop, either filled in at request time or prerendered at build time.

### Why this matters for BuildMe

We need `/initiatives/[id]` so each saved initiative has its own directly-linkable detail page. `[id]` is the Dynamic Segment — Next.js will capture whatever value is in that URL position (e.g. `/initiatives/abc123`) and hand it to the page as a `params` prop, which we read to look up the right initiative from storage.

### Client Components and `params` (verified against the installed version)

Checked against `node_modules/next/dist/docs/.../dynamic-routes.md` for our installed Next.js version (16.3.4), since a scaffold warning noted this version may differ from older docs: `params` is a `Promise`, not a plain object. In an `async` Server Component page you'd `await params`, but our detail page reads/writes `localStorage`, which only exists in the browser — so the page must be a Client Component (`'use client'`). Client Components can't be `async`, so instead we unwrap the promise with React's `use()` hook:

```tsx
'use client'
import { use } from 'react'

export default function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  // look up the initiative with this id from localStorage
}
```

# BuildMe

A small Turing College Sprint 1 app for assessing and comparing product initiatives.

## Read first

- `docs/product-brief.md`: product context, scope and scoring principles.
- `docs/sprint-1-requirements.md`: original course instructions. Never provided — proceed from `docs/product-brief.md` alone rather than re-asking for it.
- `docs/nextjs-reference.md`: cited excerpt on Dynamic Route Segments, including a project-specific note on Client Components and `params` (see below).
- Consult relevant references in `docs/` when implementing framework features.

## Stack and boundaries

- Next.js App Router, TypeScript and Tailwind CSS.
- Run locally with `npm run dev` at `localhost:3000`.
- No backend, database, user accounts, deployment or public URL in Sprint 1.
- Keep the app minimal. Future-sprint ideas are context, not current scope.
- Persistence: `localStorage`, decided and implemented (see `src/lib/storage.ts`). Don't re-litigate this choice.
- A request that's a genuine scope addition beyond the minimal Sprint 1 plan (e.g. bulk CSV import) goes on its own git branch, not straight onto `master`.

## Required behavior

- At least two pages, including `/initiatives/[id]` or an equivalent dynamic detail route that directly opens the correct saved initiative.
- Create, edit and delete initiatives, with deletion confirmation.
- Persist initiatives and scoring settings through full reloads and browser close/reopen using `localStorage`.
- Friendly empty and not-found states.
- Usable laptop and phone layouts.
- Follow the scoring rules in the product brief.

## Working together

- Explain important decisions simply; I am learning.
- Agree a small plan and establish context files before scaffolding.
- Ask before adding dependencies or expanding scope — use concrete, multiple-choice questions (AskUserQuestion) rather than guessing when a request is ambiguous or has real trade-offs (storage engine, a new field's meaning, CSV vs. Excel, etc.).
- Guide me through finding and reading official Next.js documentation, then saving an excerpt in `docs/` with the source URL at the top: search → read → paste → cite. When something in a newer Next.js version might differ from training data, check the docs bundled in this project's own `node_modules/next/dist/docs/` rather than assuming.
- Build one feature at a time, not the entire app in one go.
- **Never run `git commit` unless I explicitly say so in that turn** (e.g. "commit", "commit here") — build and verify freely, but always stop and let me check before committing, even if verification passed.
- Before reporting a feature done: type-check (`npx tsc --noEmit`), run a production build (`npm run build`), and actually click through the feature in a headless browser (Playwright — installed once into the session scratchpad, not this project's dependencies) with screenshots and a console-error check. Don't call something verified from reading the code alone.
- A README screenshot must come from a production build (`npm run build && npm run start`), not `npm run dev` — the dev server shows a Next.js devtools badge that isn't part of the real app.
- Use a sensible `.gitignore` for dependencies, secrets, generated files and OS/editor clutter.
- After must-haves work, do a short design pass.
- Verify CRUD, persistence, direct detail URLs, missing-item URLs, scoring validation and mobile layout.
- Any new field added to `Initiative` or `ScoringModel` (`src/lib/types.ts`) needs a backward-compatible default for initiatives already saved in someone's `localStorage`. Sample initiatives are user-editable and deletable like any other, so repair old stored data by backfilling missing fields only (`{ ...seed, ...stored }`) — never blanket-overwrite or re-add a stored/deleted record, or it will silently revert an edit or resurrect a deletion.
- A page reading `localStorage` (or otherwise browser-only) must be a Client Component. In this project's installed Next.js version, a dynamic route's `params` is a `Promise`; a Client Component page unwraps it with React's `use()` hook, not top-level `await`.

## Submission and learning

- Use the Turing College-provided GitHub repository for submission.
- `README.md` is written and current: describes the actual app, local setup and includes a real screenshot at `docs/screenshot.png`. Keep it in sync as features change.
- I will write `REFLECTION.md` myself in 250–450 words.
- Help me keep notes on scope, storage choice, a context-engineering moment, design changes, what was harder than plain HTML and what I would change next time.
- Do not invent my experience.

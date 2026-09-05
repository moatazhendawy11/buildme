# BuildMe

A small Turing College Sprint 1 app for assessing and comparing product initiatives.

## Read first

- `docs/product-brief.md`: product context, scope and scoring principles.
- `docs/sprint-1-requirements.md`: original course instructions. If missing, ask me to provide the assignment before scaffolding.
- Consult relevant references in `docs/` when implementing framework features.

## Stack and boundaries

- Next.js App Router, TypeScript and Tailwind CSS.
- Run locally with `npm run dev` at `localhost:3000`.
- No backend, database, user accounts, deployment or public URL in Sprint 1.
- Keep the app minimal. Future-sprint ideas are context, not current scope.

## Required behavior

- At least two pages, including `/initiatives/[id]` or an equivalent dynamic detail route that directly opens the correct saved initiative.
- Create, edit and delete initiatives, with deletion confirmation.
- Persist initiatives and scoring settings through full reloads and browser close/reopen using the agreed browser-storage mechanism.
- Friendly empty and not-found states.
- Usable laptop and phone layouts.
- Follow the scoring rules in the product brief.

## Working together

- Explain important decisions simply; I am learning.
- Agree a small plan and establish context files before scaffolding.
- Before building features, explain browser-storage trade-offs, recommend an option and let me confirm it.
- Guide me through finding and reading official Next.js documentation, then saving an excerpt in `docs/` with the source URL at the top: search → read → paste → cite.
- Build one feature at a time, not the entire app in one go. Help me inspect changes, verify each stable milestone and commit it.
- Ask before adding dependencies or expanding scope.
- Use a sensible `.gitignore` for dependencies, secrets, generated files and OS/editor clutter.
- After must-haves work, do a short design pass.
- Verify CRUD, persistence, direct detail URLs, missing-item URLs, scoring validation and mobile layout.

## Submission and learning

- Use the Turing College-provided GitHub repository for submission.
- Prepare `README.md` describing the actual app, local setup and an actual screenshot.
- I will write `REFLECTION.md` myself in 250–450 words.
- Help me keep notes on scope, storage choice, a context-engineering moment, design changes, what was harder than plain HTML and what I would change next time.
- Do not invent my experience.

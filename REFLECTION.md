For this project, I built BuildMe, an app that helps product teams assess and compare proposed initiatives. I chose this because prioritization is relevant to my product and program management experience, and I wanted something I could develop further during the course.

My original idea included inputs from different teams, approvals and comparing expected results with actual outcomes. For Sprint 1, I narrowed this to a local, single-user app where a PM records initiatives and assessments manually.

After discussing localStorage and IndexedDB with Claude, I chose localStorage. It was simpler and sufficient for saving a small number of initiatives in a single-user app.

After discussing the options with Chatgpt, I got help from it throughout the process on drafting better prompts and guiding me to create new features.

I separated the product context into `docs/product-brief.md` and the working instructions into `CLAUDE.md`. This helped me distinguish the longer-term vision from what Claude should build now.

Building one feature at a time helped me stay in control. I first added initiative creation and saving, then editing and deletion, and later assessments and file imports. Committing after each working feature made the changes easier to review and gave me a stable point to return to if something broke. In hindsight, importing was an extra rather than a requirement, so I needed to keep checking that the core functionality came first.

For the interface, I focused on a simple initiative list, readable forms and clear save confirmations.

Compared with the plain-HTML app, I found it harder to understand the project structure and which files controlled each part of the app. I needed Claude to explain how they fitted together so I could review changes with more confidence.

The main lesson for me was to give Claude a focused task, inspect the result and verify it before moving on. Next time, I would keep the initial scope tighter and leave more time for testing and documenting what I learned.

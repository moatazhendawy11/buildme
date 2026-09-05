For this project, I built BuildMe, an app that helps product teams assess and compare proposed initiatives. I chose this because prioritization is relevant to my product and program management experience, and I wanted something I could develop further during the course.

My original idea included inputs from different teams, approvals and comparing expected results with actual outcomes. For Sprint 1, I narrowed this to a local, single-user app where a PM records initiatives and assessments manually.

After discussing the options with Chatgpt, I got help from it throughout the process on drafting better prompts and guiding me to create new features.

I separated the product context into `docs/product-brief.md` and the working instructions into `CLAUDE.md`. This helped me distinguish the longer-term vision from what Claude should build now.

I built incrementally and committed after each working feature. These included creating, editing and deleting initiatives, recording assessments and calculating scores. I also added CSV and Excel imports with downloadable templates. In hindsight, importing was an extra rather than a requirement, so I needed to keep checking that the core functionality came first.

For the interface, I focused on a simple initiative list, readable forms and clear save confirmations.

The main lesson for me was to give Claude a focused task, inspect the result and verify it before moving on. Next time, I would keep the initial scope tighter and leave more time for testing and documenting what I learned.

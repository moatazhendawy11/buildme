# BuildMe — Product brief

## Product and goal

BuildMe helps product teams compare proposed initiatives using a shared, configurable scoring model and supporting evidence.

The goal is faster, more defensible product-investment decisions: collect evidence from the right teams, expose uncertainty and preserve why decisions were made.

The app makes assumptions, team inputs and trade-offs visible. Product supplies a recommendation; leadership owns the decision. The app does not automatically decide the roadmap.

The primary user is a PM collecting inputs from Engineering, Finance, Analytics and other relevant teams.

Our initial target-customer hypothesis is a marketplace, ecommerce, logistics, fintech or platform company with approximately 8–50 product squads and substantial cross-functional dependencies.

## Problem and intended gap

Jira, spreadsheets and Productboard already support scoring or prioritization. Calculating a number alone is not our intended value.

We are targeting organizations that use Jira primarily for execution—epics, tickets, sprint planning, owners, deadlines, development progress and releases—but still struggle to assemble evidence for the earlier decision: "Should we invest in this initiative?"

We also want to address the gap where original assumptions are not consistently compared with actual results after delivery. These gaps need validation with real users.

## Vision through Sprint 4

Eventually, teams should submit their own assessments, validate assumptions, record investment decisions and compare expected KPI impact with actual results.

Provisional progression:

- Sprint 1: local, single-user assessment and prioritization prototype.
- Sprint 2: database, accounts and shared data.
- Sprint 3: assigned assessments, collaboration and notifications.
- Sprint 4: outcome tracking and AI-assisted evidence review or decision briefs.

Sprints 2–4 are reference only. Adapt them to the actual Turing lessons later. Do not implement their functionality or introduce unnecessary infrastructure now.

## Sprint 1 focus

Do one thing well: create initiatives, assess them consistently and understand their ranking.

Use three main screens:

1. Initiative list: initiatives, scores and assessment completeness.
2. Initiative detail: create/edit the problem, proposed solution, owner, objective and expected KPI outcomes; record assessments; explain the score; add an optional recommendation and decision note. Support deletion with confirmation.
3. Scoring settings: add, edit and remove themes and criteria/KPIs; change weights and edit rating definitions.

The PM manually records team-supplied ratings, contributor/team, rationale, evidence notes and confidence. No actual team assignments or approvals yet.

## Scoring principles

Start with Outcome Impact and Feasibility as the default themes. Propose a small default model before implementation. Default weights and criteria are starting assumptions, not a scientifically validated model.

- Produce a transparent score out of 100, not a probability of success.
- Use clearly defined 0–5 ratings; higher always means more attractive.
- Theme weights must total 100%. Criteria weights within each theme must also total 100%.
- Missing ratings mean unassessed, not zero. Exclude incomplete assessments from the completed ranking.
- Compare initiatives under the same shared model and recalculate when it changes.
- Keep confidence and dependency notes outside the weighted score.

## Design and examples

Build a minimal, easy-to-use application with clean typography, readable spacing and responsive layouts.

Include two clearly fictional ecommerce/shipping examples.

Earlier mockups are visual references, not a requirement to implement every depicted screen or future feature.

import type { Initiative, Rating, ScoringModel } from "./types";

/**
 * Starting default model, not a validated one: two themes (Outcome Impact,
 * Feasibility), two criteria each. Editable later in Scoring Settings.
 */
export const DEFAULT_SCORING_MODEL: ScoringModel = {
  themes: [
    {
      id: "outcome-impact",
      name: "Outcome Impact",
      weight: 60,
      criteria: [
        {
          id: "business-impact",
          name: "Business Impact",
          weight: 50,
          ratingDefinitions: {
            0: "No meaningful business impact expected.",
            1: "Marginal impact; hard to quantify or negligible.",
            2: "Minor measurable impact on revenue or cost.",
            3: "Moderate, clearly measurable business impact.",
            4: "Significant impact on a key business metric.",
            5: "Transformational impact on company-level metrics.",
          },
        },
        {
          id: "customer-impact",
          name: "Customer Impact",
          weight: 50,
          ratingDefinitions: {
            0: "No noticeable effect for customers.",
            1: "Improves a small edge case for very few users.",
            2: "Modest improvement for a limited user segment.",
            3: "Clear improvement noticed by a meaningful share of users.",
            4: "Major improvement affecting most users.",
            5: "Fundamentally changes the experience for nearly all users.",
          },
        },
      ],
    },
    {
      id: "feasibility",
      name: "Feasibility",
      weight: 40,
      criteria: [
        {
          id: "engineering-effort",
          name: "Engineering Effort",
          weight: 50,
          ratingDefinitions: {
            0: "Very large effort; touches many systems, likely multi-quarter.",
            1: "Large effort; significant cross-team work, ~1 quarter or more.",
            2: "Considerable effort; several weeks, some complexity.",
            3: "Moderate effort; a few weeks, contained scope.",
            4: "Small effort; about a week, low complexity.",
            5: "Minimal effort; a few days, trivial to implement.",
          },
        },
        {
          id: "delivery-confidence",
          name: "Delivery Confidence",
          weight: 50,
          ratingDefinitions: {
            0: "Highly uncertain; major unknowns or dependencies unresolved.",
            1: "Low confidence; several open risks or unknowns.",
            2: "Some uncertainty; a few unresolved risks.",
            3: "Reasonably confident; minor open questions.",
            4: "High confidence; approach validated, few risks.",
            5: "Very high confidence; well understood, low risk.",
          },
        },
      ],
    },
  ],
};

function allCriteria(model: ScoringModel) {
  return model.themes.flatMap((theme) => theme.criteria);
}

export function isComplete(initiative: Initiative, model: ScoringModel): boolean {
  return allCriteria(model).every(
    (criterion) => initiative.ratings[criterion.id] != null
  );
}

/** Weighted score out of 100, or null if any criterion is unrated. */
export function calculateScore(
  initiative: Initiative,
  model: ScoringModel
): number | null {
  if (!isComplete(initiative, model)) return null;

  const total = model.themes.reduce((themeSum, theme) => {
    const themeScore = theme.criteria.reduce((criterionSum, criterion) => {
      const rating = initiative.ratings[criterion.id] as Rating;
      return criterionSum + (criterion.weight / 100) * (rating / 5);
    }, 0);
    return themeSum + (theme.weight / 100) * themeScore;
  }, 0);

  return Math.round(total * 100);
}

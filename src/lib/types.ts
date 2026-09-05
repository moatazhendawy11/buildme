export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

/** PM/leadership decision status. Independent of assessment completeness. */
export type InitiativeStatus =
  | "under-review"
  | "recommended"
  | "not-recommended"
  | "decided";

export interface Criterion {
  id: string;
  name: string;
  /** Percentage weight within its theme. All criteria in a theme must sum to 100. */
  weight: number;
  /** What each 0-5 rating means for this criterion, editable in Scoring Settings. */
  ratingDefinitions: Record<Rating, string>;
}

export interface Theme {
  id: string;
  name: string;
  /** Percentage weight of the overall score. All themes must sum to 100. */
  weight: number;
  criteria: Criterion[];
}

export interface ScoringModel {
  themes: Theme[];
}

export interface Initiative {
  id: string;
  name: string;
  problem: string;
  proposedSolution: string;
  owner: string;
  objective: string;
  expectedKpiOutcomes: string;
  /** Keyed by criterion id. `null` means not yet rated (unassessed, not zero). */
  ratings: Record<string, Rating | null>;
  recommendation: string;
  decisionNote: string;
  status: InitiativeStatus;
  /** True for the two preloaded fictional examples, so the UI can label them clearly. */
  isSample: boolean;
  createdAt: string;
  updatedAt: string;
}

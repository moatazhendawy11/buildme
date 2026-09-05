import { parseCsv, toCsvRow } from "./csv";
import type { Initiative, Rating, ScoringModel } from "./types";

const BASIC_FIELDS: {
  header: string;
  key: "problem" | "proposedSolution" | "owner" | "objective" | "kpi" | "expectedKpiOutcomes";
}[] = [
  { header: "Problem or opportunity", key: "problem" },
  { header: "Proposed solution", key: "proposedSolution" },
  { header: "Owning team", key: "owner" },
  { header: "Strategic objective", key: "objective" },
  { header: "KPI affected", key: "kpi" },
  { header: "Expected KPI outcome", key: "expectedKpiOutcomes" },
];

/** Builds a downloadable CSV template matching the current scoring model's criteria. */
export function buildInitiativeCsvTemplate(model: ScoringModel): string {
  const criteria = model.themes.flatMap((theme) => theme.criteria);
  const headers = [
    "Name",
    ...BASIC_FIELDS.map((f) => f.header),
    ...criteria.map((c) => c.name),
  ];
  const exampleRow = [
    "Replace this row with your own initiative",
    "Describe the problem or opportunity.",
    "Describe the proposed solution.",
    "e.g. Growth",
    "e.g. Increase repeat purchase rate.",
    "e.g. Repeat purchase rate",
    "e.g. +5% within 2 quarters.",
    ...criteria.map(() => ""), // ratings are optional: leave blank, or enter 0-5
  ];
  return [toCsvRow(headers), toCsvRow(exampleRow)].join("\r\n") + "\r\n";
}

export interface CsvImportResult {
  initiatives: Initiative[];
  errors: string[];
}

/** Parses a CSV upload into new Initiatives, matching columns against the current model. */
export function parseInitiativesCsv(
  text: string,
  model: ScoringModel
): CsvImportResult {
  const rows = parseCsv(text);
  if (rows.length === 0) {
    return { initiatives: [], errors: ["The file is empty."] };
  }

  const headerRow = rows[0].map((h) => h.trim().toLowerCase());
  const nameIndex = headerRow.indexOf("name");
  if (nameIndex === -1) {
    return {
      initiatives: [],
      errors: [
        'We couldn\'t find a "Name" column. Download the template to see the expected format.',
      ],
    };
  }

  const basicIndexByKey = new Map<string, number>();
  BASIC_FIELDS.forEach(({ header, key }) => {
    const idx = headerRow.indexOf(header.toLowerCase());
    if (idx !== -1) basicIndexByKey.set(key, idx);
  });

  const allCriteria = model.themes.flatMap((theme) => theme.criteria);
  const criterionIndexById = new Map<string, number>();
  allCriteria.forEach((criterion) => {
    const idx = headerRow.indexOf(criterion.name.trim().toLowerCase());
    if (idx !== -1) criterionIndexById.set(criterion.id, idx);
  });

  const now = new Date().toISOString();
  const initiatives: Initiative[] = [];
  const errors: string[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.every((cell) => cell.trim() === "")) continue;

    const rowNumber = i + 1; // 1-based, matching a spreadsheet row number
    const name = (row[nameIndex] ?? "").trim();
    if (!name) {
      errors.push(`Row ${rowNumber}: missing name — skipped.`);
      continue;
    }

    const getBasic = (key: string) => {
      const idx = basicIndexByKey.get(key);
      return idx === undefined ? "" : (row[idx] ?? "").trim();
    };

    const ratings: Record<string, Rating | null> = {};
    allCriteria.forEach((criterion) => {
      const idx = criterionIndexById.get(criterion.id);
      const raw = idx === undefined ? "" : (row[idx] ?? "").trim();
      if (raw === "") {
        ratings[criterion.id] = null;
        return;
      }
      const num = Number(raw);
      if (Number.isInteger(num) && num >= 0 && num <= 5) {
        ratings[criterion.id] = num as Rating;
      } else {
        errors.push(
          `Row ${rowNumber}: invalid rating "${raw}" for "${criterion.name}" — left unrated.`
        );
        ratings[criterion.id] = null;
      }
    });

    initiatives.push({
      id: crypto.randomUUID(),
      name,
      problem: getBasic("problem"),
      proposedSolution: getBasic("proposedSolution"),
      owner: getBasic("owner"),
      objective: getBasic("objective"),
      kpi: getBasic("kpi"),
      expectedKpiOutcomes: getBasic("expectedKpiOutcomes"),
      ratings,
      recommendation: "",
      decisionNote: "",
      status: "under-review",
      isSample: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  return { initiatives, errors };
}

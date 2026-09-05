import type { Initiative } from "./types";

const now = new Date().toISOString();

export const SEED_INITIATIVES: Initiative[] = [
  {
    id: "one-click-reorder",
    name: "One-Click Reorder",
    problem:
      "Repeat customers have to manually re-add every item from a past order, which adds friction and quietly costs us repeat purchases.",
    proposedSolution:
      "Add a \"Reorder\" button on past orders that re-adds all items to the cart in one click, with substitutions offered for anything out of stock.",
    owner: "Priya Shah (PM, Growth)",
    objective: "Increase repeat purchase rate among existing customers.",
    expectedKpiOutcomes:
      "+5% repeat purchase rate within 2 quarters of launch.",
    ratings: {
      "business-impact": 4,
      "customer-impact": 4,
      "engineering-effort": 4,
      "delivery-confidence": 4,
    },
    recommendation: "Recommend building next quarter; low risk, clear upside.",
    decisionNote: "",
    status: "recommended",
    isSample: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "real-time-shipment-tracking",
    name: "Real-Time Shipment Tracking",
    problem:
      "Our order-tracking page only refreshes carrier status once a day, so customers contact support asking \"where is my order\" even when it's on schedule.",
    proposedSolution:
      "Integrate carrier live-tracking APIs and show real-time status and estimated delivery on the order page.",
    owner: "Marcus Lee (PM, Logistics)",
    objective: "Reduce \"where is my order\" (WISMO) support contacts.",
    expectedKpiOutcomes: "-20% WISMO support tickets within one quarter.",
    ratings: {
      "business-impact": 3,
      "customer-impact": 5,
      "engineering-effort": 1,
      "delivery-confidence": null,
    },
    recommendation: "",
    decisionNote:
      "Waiting on Engineering to confirm carrier API access before we can estimate delivery confidence.",
    status: "under-review",
    isSample: true,
    createdAt: now,
    updatedAt: now,
  },
];

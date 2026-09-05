"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SCORING_MODEL } from "./scoring-model";
import { SEED_INITIATIVES } from "./seed-data";
import type { Initiative, ScoringModel } from "./types";

const INITIATIVES_KEY = "buildme:initiatives";
const SCORING_MODEL_KEY = "buildme:scoring-model";

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Sample initiatives aren't user-editable yet, so it's always safe to
 * refresh them to the current seed definition — this repairs locally
 * stored copies from before a data-model change without touching any
 * real initiative the user created.
 */
function refreshSeeds(stored: Initiative[]): Initiative[] {
  const seedIds = new Set(SEED_INITIATIVES.map((seed) => seed.id));
  const realInitiatives = stored.filter((item) => !seedIds.has(item.id));
  return [...SEED_INITIATIVES, ...realInitiatives];
}

/**
 * Reads/writes initiatives in localStorage, seeding the two example
 * initiatives on first run. `null` while not yet hydrated on the client.
 */
export function useInitiatives() {
  const [initiatives, setInitiatives] = useState<Initiative[] | null>(null);

  useEffect(() => {
    const hasExisting = window.localStorage.getItem(INITIATIVES_KEY) != null;
    const stored = readFromStorage(INITIATIVES_KEY, SEED_INITIATIVES);
    const merged = hasExisting ? refreshSeeds(stored) : stored;
    writeToStorage(INITIATIVES_KEY, merged);
    setInitiatives(merged);
  }, []);

  const persist = useCallback((next: Initiative[]) => {
    setInitiatives(next);
    writeToStorage(INITIATIVES_KEY, next);
  }, []);

  return [initiatives, persist] as const;
}

/**
 * Reads/writes the scoring model in localStorage, seeding the default
 * model on first run. `null` while not yet hydrated on the client.
 *
 * The model isn't user-editable yet (Scoring Settings is a later
 * milestone), so it's always safe to refresh a stored copy to the
 * current default — this must change once editing exists, so a
 * user's real changes aren't overwritten.
 */
export function useScoringModel() {
  const [model, setModel] = useState<ScoringModel | null>(null);

  useEffect(() => {
    writeToStorage(SCORING_MODEL_KEY, DEFAULT_SCORING_MODEL);
    setModel(DEFAULT_SCORING_MODEL);
  }, []);

  const persist = useCallback((next: ScoringModel) => {
    setModel(next);
    writeToStorage(SCORING_MODEL_KEY, next);
  }, []);

  return [model, persist] as const;
}

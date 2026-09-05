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
 * Reads/writes initiatives in localStorage, seeding the two example
 * initiatives on first run. `null` while not yet hydrated on the client.
 */
export function useInitiatives() {
  const [initiatives, setInitiatives] = useState<Initiative[] | null>(null);

  useEffect(() => {
    const hasExisting = window.localStorage.getItem(INITIATIVES_KEY) != null;
    const loaded = readFromStorage(INITIATIVES_KEY, SEED_INITIATIVES);
    if (!hasExisting) writeToStorage(INITIATIVES_KEY, loaded);
    setInitiatives(loaded);
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
 */
export function useScoringModel() {
  const [model, setModel] = useState<ScoringModel | null>(null);

  useEffect(() => {
    const hasExisting = window.localStorage.getItem(SCORING_MODEL_KEY) != null;
    const loaded = readFromStorage(SCORING_MODEL_KEY, DEFAULT_SCORING_MODEL);
    if (!hasExisting) writeToStorage(SCORING_MODEL_KEY, loaded);
    setModel(loaded);
  }, []);

  const persist = useCallback((next: ScoringModel) => {
    setModel(next);
    writeToStorage(SCORING_MODEL_KEY, next);
  }, []);

  return [model, persist] as const;
}

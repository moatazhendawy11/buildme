import type { Rating, ScoringModel } from "@/lib/types";

export function AssessmentFields({
  model,
  ratings,
  onChange,
}: {
  model: ScoringModel;
  ratings: Record<string, Rating | null | undefined>;
  onChange: (criterionId: string, value: Rating | null) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {model.themes.map((theme) => (
        <div key={theme.id}>
          <h3 className="text-sm font-semibold text-gray-900">
            {theme.name}{" "}
            <span className="font-normal text-gray-500">
              ({theme.weight}% of score)
            </span>
          </h3>
          <ul className="mt-2 flex flex-col gap-2">
            {theme.criteria.map((criterion) => {
              const rating = ratings[criterion.id] ?? null;
              const selectId = `rating-${criterion.id}`;
              return (
                <li
                  key={criterion.id}
                  className="rounded-md border border-gray-200 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor={selectId}
                      className="text-sm font-medium text-gray-900"
                    >
                      {criterion.name}
                    </label>
                    <select
                      id={selectId}
                      value={rating ?? ""}
                      onChange={(e) =>
                        onChange(
                          criterion.id,
                          e.target.value === ""
                            ? null
                            : (Number(e.target.value) as Rating)
                        )
                      }
                      className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <option value="">Not rated</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  {rating != null && (
                    <p className="mt-1 text-sm text-gray-500">
                      {criterion.ratingDefinitions[rating]}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

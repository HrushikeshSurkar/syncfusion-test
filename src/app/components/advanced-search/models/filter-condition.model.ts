// src/app/shared/advanced-search/models/filter-condition.model.ts
export interface FilterCondition {
  attribute: string;
  operator: string;
  value: string | number | boolean | string[];
  // (No "any" or "unknown" used)
}

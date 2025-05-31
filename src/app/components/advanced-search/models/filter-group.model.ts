import { FilterCondition } from './filter-condition.model';

// src/app/shared/advanced-search/models/filter-group.model.ts
export interface FilterGroup {
  filters: FilterCondition[];
  groupOperator: 'AND' | 'OR';
}

// src/app/shared/advanced-search/models/advanced-filter-query.model.ts
import { FilterCondition } from './filter-condition.model';
import { FilterGroup } from './filter-group.model';

export interface AdvancedFilterQuery {
  filters: (FilterCondition | FilterGroup)[];
  updatedBy: string[];
  updatedBetween: {
    start: Date;
    end: Date;
  };
}

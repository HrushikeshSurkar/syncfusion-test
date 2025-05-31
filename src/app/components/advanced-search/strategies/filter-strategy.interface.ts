// src/app/shared/advanced-search/strategies/filter-strategy.interface.ts
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCondition } from '../models/filter-condition.model';
import { FilterOption } from '../models/filter-option.model';

/**
 * Every “filter strategy” must:
 * 1) expose a unique key (e.g. 'state', 'type', etc.)
 * 2) return the Component class to render
 * 3) provide initial data (e.g. checkbox options)
 * 4) accept selection changes
 * 5) extract a typed FilterCondition when asked
 */
export interface FilterStrategy {
  /** e.g. 'state', 'type', 'criticality' */
  key: string;

  /** Returns the Angular component type to load dynamically */
  getComponent(): Type<unknown>;

  /** Returns an Observable of options; used as @Input() for that component */
  getInitialData(): Observable<FilterOption[]>;

  /** Called whenever the component’s selection changes */
  setSelection(values: string[]): void;

  /** Returns a FilterCondition (or null if nothing chosen) */
  extractCondition(): FilterCondition | null;
}

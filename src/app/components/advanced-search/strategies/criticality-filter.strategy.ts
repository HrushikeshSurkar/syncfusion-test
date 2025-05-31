// src/app/shared/advanced-search/strategies/criticality-filter.strategy.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonCheckboxFilterComponent } from '../filters/common-checkbox-filter/common-checkbox-filter.component';
import { FilterCondition } from '../models/filter-condition.model';
import { FilterOption } from '../models/filter-option.model';
import { FilterStrategy } from './filter-strategy.interface';

@Injectable({ providedIn: 'root' })
export class CriticalityFilterStrategy implements FilterStrategy {
  key = 'criticality';
  private selectedValues: string[] = [];

  getComponent(): typeof CommonCheckboxFilterComponent {
    return CommonCheckboxFilterComponent;
  }

  getInitialData(): Observable<FilterOption[]> {
    const options: FilterOption[] = [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ];
    return of(options);
  }

  setSelection(values: string[]): void {
    this.selectedValues = [...values];
  }

  extractCondition(): FilterCondition | null {
    if (this.selectedValues.length === 0) {
      return null;
    }
    return {
      attribute: this.key,
      operator: 'in',
      value: [...this.selectedValues],
    };
  }
}

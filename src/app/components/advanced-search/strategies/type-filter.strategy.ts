// src/app/shared/advanced-search/strategies/type-filter.strategy.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonCheckboxFilterComponent } from '../filters/common-checkbox-filter/common-checkbox-filter.component';
import { FilterCondition } from '../models/filter-condition.model';
import { FilterOption } from '../models/filter-option.model';
import { FilterStrategy } from './filter-strategy.interface';

@Injectable({ providedIn: 'root' })
export class TypeFilterStrategy implements FilterStrategy {
  key = 'type';
  private selectedValues: string[] = [];

  getComponent(): typeof CommonCheckboxFilterComponent {
    return CommonCheckboxFilterComponent;
  }

  getInitialData(): Observable<FilterOption[]> {
    const options: FilterOption[] = [
      { label: 'Bug', value: 'bug' },
      { label: 'Feature', value: 'feature' },
      { label: 'Task', value: 'task' },
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

// src/app/shared/advanced-search/strategies/metadata-filter.strategy.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MetadataFilterComponent } from '../filters/metadata-filter/metadata-filter.component';
import { FilterCondition } from '../models/filter-condition.model';
import { FilterOption } from '../models/filter-option.model';
import { FilterStrategy } from './filter-strategy.interface';

@Injectable({ providedIn: 'root' })
export class MetadataFilterStrategy implements FilterStrategy {
  key = 'metadata';
  private subject = new BehaviorSubject<string>('');

  getComponent(): typeof MetadataFilterComponent {
    return MetadataFilterComponent;
  }

  getInitialData(): Observable<FilterOption[]> {
    // Not used by MetadataFilterComponent; return empty array
    return of([]);
  }

  setSelection(values: string[]): void {
    // Expect values = [searchText]
    this.subject.next(values.length > 0 ? values[0] : '');
  }

  extractCondition(): FilterCondition | null {
    const text = this.subject.value.trim();
    if (!text) {
      return null;
    }
    return {
      attribute: this.key,
      operator: 'contains',
      value: text,
    };
  }
}

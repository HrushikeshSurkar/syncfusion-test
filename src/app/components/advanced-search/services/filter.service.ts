// src/app/shared/advanced-search/services/filter.service.ts
import { Injectable } from '@angular/core';
import { CriticalityFilterStrategy } from '../strategies/criticality-filter.strategy';
import { FilterStrategy } from '../strategies/filter-strategy.interface';
import { MetadataFilterStrategy } from '../strategies/metadata-filter.strategy';
import { StateFilterStrategy } from '../strategies/state-filter.strategy';
import { TypeFilterStrategy } from '../strategies/type-filter.strategy';

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor(
    private state: StateFilterStrategy,
    private type: TypeFilterStrategy,
    private criticality: CriticalityFilterStrategy,
    private metadata: MetadataFilterStrategy
  ) {}

  getStrategies(): FilterStrategy[] {
    return [
      this.state,
      this.type,
      this.criticality,
      this.metadata,
      // add more strategies (e.g. UserFilterStrategy) here
    ];
  }
}

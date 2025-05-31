// src/app/shared/advanced-search/filters/metadata-filter/metadata-filter.component.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterOption } from '../../models/filter-option.model';

@Component({
  selector: 'app-metadata-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metadata-filter.component.html',
  styleUrls: ['./metadata-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFilterComponent {
  /** Not actually needed, but kept for consistency */
  @Input() options: FilterOption[] = [];

  /** Emits an array containing the single search‐string */
  @Output() selectionChanged = new EventEmitter<string[]>();

  searchText = '';

  ngOnChanges(): void {
    // If parent updates “options,” ignore—this component is purely a text input.
  }

  onTextChange(): void {
    this.selectionChanged.emit([this.searchText]);
  }
}

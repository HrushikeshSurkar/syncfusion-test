// src/app/shared/advanced-search/filters/common-checkbox-filter/common-checkbox-filter.component.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FilterOption } from '../../models/filter-option.model';

@Component({
  selector: 'app-common-checkbox-filter',
  standalone: true,
  imports: [CommonModule], // we only need CommonModule for *ngFor
  templateUrl: './common-checkbox-filter.component.html',
  styleUrls: ['./common-checkbox-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonCheckboxFilterComponent {
  /**
   * We initialize options to an empty array, so `options` is never null/undefined.
   * The “!” in the template (see below) tells Angular’s compiler “I guarantee this is not null here.”
   */
  @Input() options: FilterOption[] = [];

  /** Emits the current array of selected values. */
  @Output() selectionChanged = new EventEmitter<string[]>();

  /** Internally track which values are checked. */
  private selectedSet = new Set<string>();

  /**
   * Called whenever a checkbox is toggled.
   * @param value the string‐value of that checkbox
   * @param checked whether it’s now checked (true) or unchecked (false)
   */
  toggleValue(value: string, checked: boolean): void {
    if (checked) {
      this.selectedSet.add(value);
    } else {
      this.selectedSet.delete(value);
    }
    // Emit a brand‐new array copy on every toggle
    this.selectionChanged.emit([...this.selectedSet]);
  }

  /** Helper for the template to mark a checkbox as checked/unchecked. */
  isChecked(value: string): boolean {
    return this.selectedSet.has(value);
  }
}

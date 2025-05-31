// src/app/shared/advanced-search/advanced-search.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AdvancedFilterQuery } from './models/advanced-filter-query.model';
import { FilterCondition } from './models/filter-condition.model';
import { FilterOption } from './models/filter-option.model';
import { FilterService } from './services/filter.service';
import { FilterStrategy } from './strategies/filter-strategy.interface';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [],
  providers: [FilterService],
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchComponent implements OnInit {
  /**
   * Reference to the <ng-template #titleTpl> in the template.
   * We'll use this to render <h5>{{ title }}</h5> above each filter UI.
   */
  @ViewChild('titleTpl', { static: true })
  titleTpl!: TemplateRef<{ $implicit: string }>;

  /**
   * The ViewContainerRef for <ng-container #filterHost>.
   * Into here we will insert (1) a title view, (2) a filter component, for each strategy.
   */
  @ViewChild('filterHost', { read: ViewContainerRef, static: true })
  filterHost!: ViewContainerRef;

  /** Keep track of each strategy + its ComponentRef, so we can extract conditions later */
  private strategyRefs: Array<{
    strategy: FilterStrategy;
    compRef: ComponentRef<unknown>;
  }> = [];

  constructor(
    private injector: Injector,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    // 1) Fetch all active FilterStrategy implementations (ordered however you like)
    const strategies: FilterStrategy[] = this.filterService.getStrategies();

    // 2) For each strategy, first render its title, then render its UI component
    strategies.forEach((strategy) => {
      // a) Insert the "title" embedded view:
      //    - We pass context = { $implicit: strategy.key }, so inside #titleTpl, "title" = key.
      this.filterHost.createEmbeddedView(this.titleTpl, {
        $implicit: strategy.key,
      });

      // b) Now create the actual filter‐UI component dynamically:
      const compRef = this.filterHost.createComponent(strategy.getComponent(), {
        injector: this.injector,
      });

      // c) Once we have the component instance, feed it initial options:
      strategy.getInitialData().subscribe((options: FilterOption[]) => {
        compRef.setInput('options', options);
      });

      // d) Subscribe to the component’s @Output() "selectionChanged":
      const instAny = compRef.instance as any;
      if (instAny.selectionChanged && instAny.selectionChanged.subscribe) {
        instAny.selectionChanged.subscribe((values: string[]) => {
          strategy.setSelection(values);
        });
      }

      // e) Keep track so we can call extractCondition() later in onApply()
      this.strategyRefs.push({ strategy, compRef });
    });
  }

  /** Called when “Apply Filters” is clicked */
  onApply(): void {
    // 1) Ask each strategy to produce a FilterCondition (or null if nothing selected)
    const conditions: FilterCondition[] = this.strategyRefs
      .map(({ strategy }) => strategy.extractCondition())
      .filter((c): c is FilterCondition => c !== null);

    // 2) Build the final AdvancedFilterQuery object
    const query: AdvancedFilterQuery = {
      filters: conditions,
      updatedBy: [], // you can wire up a user multiselect later
      updatedBetween: {
        start: new Date(), // placeholder; replace with real date inputs if added
        end: new Date(), // placeholder
      },
    };

    // 3) For now, just log it. You could also emit it via an @Output() if needed.
    console.log('AdvancedFilterQuery:', query);
  }
}

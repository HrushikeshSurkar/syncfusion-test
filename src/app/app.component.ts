import { Component } from '@angular/core';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

@Component({
  selector: 'app-root',
  imports: [AdvancedSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

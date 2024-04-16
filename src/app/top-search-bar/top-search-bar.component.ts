import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuerySuggestionService } from '../services/query-suggestions/query-suggestion.service';
import { MatIcon } from '@angular/material/icon';
import { SearchStudySetService } from '../services/search-study-set/search-study-set.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './top-search-bar.component.html',
  styleUrl: './top-search-bar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopSearchBarComponent implements OnInit {
  formControl = new FormControl('');
  filteredOptions?: Observable<string[]>;

  constructor(
    private suggestionService: QuerySuggestionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.suggestionService.getSuggestionsObservable();
  }

  updateSuggestions(partial: string) {
    this.suggestionService.updateSuggestions(partial);
  }

  // clicking on result in drop down
  onResultSelection(event: MatAutocompleteSelectedEvent) {
    this.showSearchResults(event.option.value);
  }

  // pressing enter in input box
  onKeyboardEnter(value: string, e: Event) {
    e.stopPropagation();
    this.showSearchResults(value);
  }

  showSearchResults(searchQuery: string) {
    if (searchQuery) {
      this.router.navigate(["search"], { queryParams:{ query: searchQuery }});
      this.formControl.reset();
    }
  }
}

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
  private selected: string = '';

  constructor(
    private suggestionService: QuerySuggestionService,
    private searchSetService: SearchStudySetService
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.suggestionService.getSuggestionsObservable();
  }

  updateSuggestions(partial: string) {
    this.suggestionService.updateSuggestions(partial);
  }

  // clicking on result in drop down
  onResultSelection(event: MatAutocompleteSelectedEvent) {
    this.getSearchResults(event.option.value);
  }

  // pressing enter in input box
  onKeyboardEnter(value: string, e: Event) {
    e.stopPropagation();
    this.getSearchResults(value);
  }

  getSearchResults(query: string) {
    if (this.selected != query) {
      this.selected = query;
      // placeholder to show it works, will be replaced with navigating to search page
      this.searchSetService.searchForSets(query)
        .then(res => console.log(res));
    }
  }
}

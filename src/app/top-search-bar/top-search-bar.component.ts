import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { QuerySuggestionService } from '../services/query-suggestions/query-suggestion.service';
import { MatIcon } from '@angular/material/icon';

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
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  selected: string = '';

  constructor(private suggestionService: QuerySuggestionService) {}

  ngOnInit(): void {
      this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(option: string): string {
    return option;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updateSuggestions(value: string) {
    // might want to optimize to reduce pings to typesense if time permits
    this.suggestionService.getSearchSuggestions(value)
      .then(searches => this.options = searches);
  }

  onResultSelection(event: MatAutocompleteSelectedEvent) {
    this.getSearchResults(event.option.value);
  }

  onKeyboardEnter(value: string, e: Event) {
    e.stopPropagation();
    this.getSearchResults(value);
  }

  getSearchResults(query: string) {
    if (this.selected != query) {
      this.selected = query;
    }
  }
}

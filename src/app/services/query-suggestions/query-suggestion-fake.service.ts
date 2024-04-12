import { Injectable } from '@angular/core';
import { QuerySuggestionService } from './query-suggestion.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuerySuggestionFakeService extends QuerySuggestionService{

  private _suggestions: string[] = [
    "mitosis",
    "lemonade",
    "stages of grief"
  ];

  private _suggestionsSubject: Subject<string[]> = new Subject();

  override getSuggestionsObservable(): Observable<string[]> {
    return this._suggestionsSubject.asObservable();
  }

  override updateSuggestions(partial: string): void {
    this._suggestionsSubject.next(this._filter(partial));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._suggestions.filter(option => option.toLowerCase().includes(filterValue));
  }
}

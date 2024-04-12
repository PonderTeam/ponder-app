import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class QuerySuggestionService {
  /** Gets search suggestions based on a partial query */
  abstract getSuggestionsObservable(): Observable<string[]>;

  /** Pass partial query to update suggestions */
  abstract updateSuggestions(partial: string): void;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class QuerySuggestionService {
  /** Gets search suggestions based on a partial query */
  abstract getSearchSuggestions(partial: string): Promise<string[]>;
}

import { Injectable } from '@angular/core';
import { QuerySuggestionService } from './query-suggestion.service';

@Injectable({
  providedIn: 'root'
})
export class QuerySuggestionFakeService extends QuerySuggestionService{

  override getSearchSuggestions(partial: string): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      resolve(['Mitosis'])
    });
  }
}

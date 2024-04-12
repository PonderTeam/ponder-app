import { Injectable } from '@angular/core';
import { client } from '../search-study-set/search-study-set-module';
import { QuerySuggestionService } from './query-suggestion.service';
import { Observable, Subject } from 'rxjs';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

@Injectable({
  providedIn: 'root'
})
export class QuerySuggestionTypesenseService extends QuerySuggestionService {

  private _suggestionSubject: Subject<string[]> = new Subject();

  override getSuggestionsObservable(): Observable<string[]> {
    return this._suggestionSubject.asObservable();
  }

  override updateSuggestions(partial: string): void {
    let search: SearchParams = {
      'q' : partial,
      'query_by': 'q',
      'include_fields': 'q',
      'per_page': 4,
      'infix': 'fallback',
      'sort_by': ['_text_match:desc', 'count:desc']
    };

    client.collections('search_queries')
      .documents()
      .search(search)
      .then(res =>
        (res.hits as Array<any>).map(hit => (hit.document.q) as string)
    ).then(suggestions => this._suggestionSubject.next(suggestions));
  }
}

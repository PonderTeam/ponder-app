import { Injectable } from '@angular/core';
import { client } from '../search-study-set/search-study-set-module';
import { QuerySuggestionService } from './query-suggestion.service';

@Injectable({
  providedIn: 'root'
})
export class QuerySuggestionTypesenseService extends QuerySuggestionService {

  override async getSearchSuggestions(partial: string): Promise<string[]> {
    let search = {
      'q' : partial,
      'query_by': 'q',
      'include_fields': 'q',
      'per_page': 4
    };

    return client.collections('search_queries')
      .documents()
      .search(search)
      .then(searchResults =>
        (searchResults.hits as Array<any>).map(hit => (hit.document.q) as string)
      );
  }
}

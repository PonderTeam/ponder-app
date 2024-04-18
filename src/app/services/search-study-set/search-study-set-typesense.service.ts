import { Injectable } from '@angular/core';
import { SearchStudySetService } from './search-study-set.service';
import Typesense from 'typesense';
import { environment } from '../../../environments/environment';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import { Observable, defer, from } from 'rxjs';

const config = environment.typesenseConfig;
export const client = new Typesense.Client({
  'nodes': [{
    'host': config.host,
    'port': config.port,
    'protocol': config.protocol,
  }],
  'apiKey': config.searchApiKey,
  'connectionTimeoutSeconds': 2
})

@Injectable({
  providedIn: 'root'
})
export class SearchStudySetTypesenseService implements SearchStudySetService {

  searchForSets(query: string): Observable<string[]> {
    let search: SearchParams = {
      'q' : query,
      'query_by': 'title, description, flashcards.term, sequences.name',
      'include_fields': 'id',
      'infix' : ['fallback', 'always', 'fallback', 'off'],
      'per_page': 15
    };

    return defer(() => from(client.collections('study-sets')
      .documents()
      .search(search)
      .then(searchResults =>
        (searchResults.hits as Array<any>).map(hit => (hit.document.id) as string)
      )
      .catch(_ => [])
    ));
  }
}

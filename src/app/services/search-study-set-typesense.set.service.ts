import { Injectable } from '@angular/core';
import { SearchStudySetService } from './search-study-set.service';
import Typesense from 'typesense';
import { environment } from '../../environments/environment';

const config = environment.typesenseConfig;

@Injectable({
  providedIn: 'root'
})
export class SearchStudySetTypesenseSetService implements SearchStudySetService {

  private client = new Typesense.Client({
    'nodes': [{
      'host': config.host,
      'port': config.port,
      'protocol': config.protocol,
    }],
    'apiKey': config.searchApiKey,
    'connectionTimeoutSeconds': 2
  })


  async searchForSets(query: string) {
    let search = {
      'q' : query,
      'query_by': 'title, flashcards.term, flashcards.definition, sequences.name',
      'include_fields': 'id'
    };

    return await this.client.collections('study-sets')
      .documents()
      .search(search)
      .then(searchResults =>
        (searchResults.hits as Array<any>).map(hit => (hit.document.id) as string)
      );
  }
}

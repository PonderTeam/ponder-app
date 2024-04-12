import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class SearchStudySetService {

  /** Returns a list of ids for study sets that match the search query. */
  abstract searchForSets(query: string): Promise<string[]>;

}

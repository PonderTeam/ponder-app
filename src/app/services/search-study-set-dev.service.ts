import { Injectable } from '@angular/core';
import { SearchStudySetService } from './search-study-set.service';

@Injectable({
  providedIn: 'root'
})
export class SearchStudySetDevService implements SearchStudySetService {

  searchForSets(query: string): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      resolve(['aaaa'])
    });
  }

}

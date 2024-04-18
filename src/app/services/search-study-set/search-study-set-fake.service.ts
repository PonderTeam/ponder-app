import { Injectable } from '@angular/core';
import { SearchStudySetService } from './search-study-set.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStudySetFakeService implements SearchStudySetService {

  searchForSets(query: string): Observable<string[]> {
    return new Observable((subscriber) => {
      subscriber.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'eeee']);
    });
  }

}

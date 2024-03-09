import { Injectable } from '@angular/core';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { Observable } from 'rxjs';

/**
 * Abstract class that defines the standard methods for all Study Set Services.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class StudySetService {
  /**
   * Returns a study set observable.
   * @param id id of the requested set
   */
  abstract getStudySet(id: string): Observable<StudySetData>;

  /**
   * Returns multiple study sets observable.
   * @param ids ids of the requested sets
   */
  abstract getStudySets(ids: string[]): Observable<StudySetData[]>;

  /**
   * Saves the study set to the server and returns sets id number
   * stored on the server observable.
   */
  abstract saveStudySet(studySet: StudySetModel): Observable<StudySetData>;
}

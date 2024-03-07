import { Injectable } from '@angular/core';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';

/**
 * Abstract class that defines the standard methods for all Study Set Services.
 */
// @Injectable({
//   providedIn: 'root'
// })
export abstract class StudySetService {
  /**
   * Returns a study set.
   * @param id id of the requested set
   */
  abstract getStudySet(id: number): Promise<StudySetData>;

  /**
   * Returns multiple study sets.
   * @param ids ids of the requested sets
   */
  abstract getStudySets(ids: number[]): Promise<StudySetData[]>;

  /**
   * Saves the study set to the server and returns sets id number
   * stored on the server.
   */
  abstract saveStudySet(studySet: StudySetModel[]): Promise<number>;
}

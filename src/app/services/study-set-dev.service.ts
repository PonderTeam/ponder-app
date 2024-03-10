import { Injectable } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudySetDevService extends StudySetService{
  readonly baseUrl = 'http://localhost:3000/';
  readonly studySetEndpoint = "studySets";
  readonly serverStateEndpoint = "state";

  constructor(private http: HttpClient) {
    super();
   };

  override getStudySet(id: string): Observable<StudySetData> {
    return this.http.get<StudySetModel>(`${this.baseUrl}${this.studySetEndpoint}/${id}`)
      .pipe(map((dbSet: StudySetModel) => StudySetData.copyStudySet(dbSet)));
  }

  override getStudySets(ids: string[]): Observable<StudySetData[]> {
    return forkJoin(ids.map(id => this.getStudySet(id)));
  }

  override saveStudySet(studySet: StudySetModel): Observable<StudySetData> {
    if(!studySet.id) {
      return this.http.post(`${this.baseUrl}${this.studySetEndpoint}`, {
          owner: studySet.owner,
          title: studySet.title,
          description: studySet.description,
          flashcards: studySet.flashcards,
          sequences: studySet.sequences,
        }).pipe(map((studySet, index) => StudySetData.copyStudySet(studySet as StudySetModel)));
    } else {
      return this.http.put(`${this.baseUrl}${this.studySetEndpoint}/${studySet.id}`, {
        owner: studySet.owner,
        title: studySet.title,
        description: studySet.description,
        flashcards: studySet.flashcards,
        sequences: studySet.sequences,
      }).pipe(map((studySet, index) => StudySetData.copyStudySet(studySet as StudySetModel)));
    }
  }
}

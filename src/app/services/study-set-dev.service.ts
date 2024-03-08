import { Injectable } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { FlashcardData, FlashcardModel } from '../data-models/flashcard-model';
import { SequenceData, SequenceModel } from '../data-models/sequence-model';

@Injectable({
  providedIn: 'root'
})
export class StudySetDevService extends StudySetService{
  readonly baseUrl = 'http://localhost:3000/';
  readonly studySetEndpoint = "studySets";
  readonly serverStateEndpoint = "state";

  override async getStudySet(id: string): Promise<StudySetData> {
    const studySet = await fetch(`${this.baseUrl}${this.studySetEndpoint}/${id}`)
      .then(response => response.json())
      .then(dbSet => StudySetData.copyStudySet(dbSet));
    return studySet;
  }

  override async getStudySets(ids: string[]): Promise<StudySetData[]> {
    const studySets = ids.map(id => this.getStudySet(id));
    return Promise.all(studySets);
  }

  override async saveStudySet(studySet: StudySetModel): Promise<StudySetData> {
    let responseSet: StudySetData = new StudySetData();
    if(!studySet.id) {
      responseSet = await fetch(`${this.baseUrl}${this.studySetEndpoint}`, {
        method: "POST",
        // Need to make a struct to remove id so server will auto generate it
        body: JSON.stringify({
          owner: studySet.owner,
          title: studySet.title,
          description: studySet.description,
          flashcards: studySet.flashcards,
          sequences: studySet.sequences,
        })
      }).then(response => response.json())
        .then(dbSet => StudySetData.copyStudySet(dbSet));
    } else {
      responseSet = await fetch(`${this.baseUrl}${this.studySetEndpoint}/${studySet.id}`, {
        method: "PUT",
        body: JSON.stringify(studySet)
      })
        .then(response => response.json())
        .then(dbSet => StudySetData.copyStudySet(dbSet));
    }
    return responseSet;
  }
}

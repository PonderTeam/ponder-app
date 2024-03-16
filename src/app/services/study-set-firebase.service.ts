import { Injectable, Inject } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { Firestore, getFirestore, doc, collection, addDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, defer, from, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudySetFirebaseService extends StudySetService{
  private firestore = Inject(Firestore);
  constructor() {
    super();
  }

  override getStudySet(id: string): Observable<StudySetData> {
      return defer(() => from(this.firestore.collection('study-set').doc(id).get() as Promise<DocumentSnapshot>))
        .pipe(map((docSnap: DocumentSnapshot) => docSnap.data() as StudySetModel))
        .pipe(map((dbSet: StudySetModel) => StudySetData.copyStudySet(dbSet)));
  }

  override getStudySets(ids: string[]): Observable<StudySetData[]> {
      return forkJoin(ids.map(id => this.getStudySet(id)));
  }

  override saveStudySet(studySet: StudySetModel): Observable<StudySetData> {
    return defer(() => from(this.firestore.collection('study-sets').doc().set({
        owener: studySet.owner,
        title: studySet.title,
        description: studySet.description,
        flashcards: studySet.flashcards,
        sequences: studySet.sequences
      }))).pipe(map((studySet) => StudySetData.copyStudySet(studySet as StudySetModel)))
  }
}

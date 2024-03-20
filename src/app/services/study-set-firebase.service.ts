import { Injectable, Inject } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import {
  getFirestore, Firestore,
  getDoc, setDoc, doc, collection,
  DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, defer, from, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudySetFirebaseService extends StudySetService{
  constructor(private firestore: Firestore = getFirestore()) {
    super();
  }

  override getStudySet(id: string): Observable<StudySetData> {
    return defer(() => from(getDoc(doc(this.firestore, 'study-sets', id)) as Promise<DocumentSnapshot>))
      .pipe(map((docSnap: DocumentSnapshot) => docSnap.data() as StudySetModel))
      .pipe(map((dbSet: StudySetModel) => StudySetData.copyStudySet(dbSet)));
  }

  override getStudySets(ids: string[]): Observable<StudySetData[]> {
    return forkJoin(ids.map(id => this.getStudySet(id)));
  }

  override saveStudySet(studySet: StudySetModel): Observable<string> {
    const docRef = doc(collection(this.firestore, 'study-sets'))
    return defer(() => from(setDoc(docRef, {
      id: docRef.id,
      owner: studySet.owner,
      title: studySet.title,
      description: studySet.description,
      flashcards: studySet.flashcards,
      sequences: studySet.sequences
    }) as Promise<void> ))
      .pipe(map(() => studySet.id = docRef.id));
  }
}

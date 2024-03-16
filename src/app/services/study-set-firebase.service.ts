import { Injectable, Inject } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { Firestore, getDoc, doc, collection, addDoc, DocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { Observable, defer, from, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudySetFirebaseService extends StudySetService{
  //private firestore = Inject(Firestore);
  constructor(private firestore: Firestore) {
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

  override saveStudySet(studySet: StudySetModel): Observable<StudySetData> {
    if(!studySet.id){
      return defer(() => from(addDoc(collection(this.firestore, 'study-sets'), {
        owener: studySet.owner,
        title: studySet.title,
        description: studySet.description,
        flashcards: studySet.flashcards,
        sequences: studySet.sequences
      }) as Promise<DocumentReference> ))
      .pipe(map((docSnap: DocumentReference) => docSnap.data() as StudySetModel))
        map((studySet) => StudySetData.copyStudySet(studySet as StudySetModel)))
    }

  }
}

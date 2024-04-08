import { Injectable } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import {
  getFirestore, Firestore,
  getDoc, setDoc, doc, collection,
  DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, defer, from, map, forkJoin, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudySetFirebaseService extends StudySetService {
  constructor(private firestore: Firestore = getFirestore()) {
    super();
  }

  override getStudySet(id: string): Observable<StudySetData> {
    if(sessionStorage.getItem(id)) {
      const JSONStudySet = JSON.parse(sessionStorage.getItem(id)!);
      return of(StudySetData.copyStudySet(JSONStudySet));
    } else {
      let studySetVar:StudySetData;
      let setObservable = defer(() =>
        from(getDoc(doc(this.firestore, 'study-sets', id)) as Promise<DocumentSnapshot>))
        .pipe(map((docSnap: DocumentSnapshot) => docSnap.data() as StudySetModel))
        .pipe(map((dbSet: StudySetModel) => StudySetData.copyStudySet(dbSet)));
      setObservable.pipe(take(1)).subscribe(sSet => {
        studySetVar = sSet;
        sessionStorage.setItem(studySetVar.id!,JSON.stringify(studySetVar));
      });
      return setObservable;
    }
  }

  override getStudySets(ids: string[]): Observable<StudySetData[]> {
    return forkJoin(ids.map(id => this.getStudySet(id)));
  }

  override saveStudySet(studySet: StudySetModel): Observable<string> {
    const docRef = studySet.id ?
      doc(this.firestore, 'study-sets', studySet.id) : doc(collection(this.firestore, 'study-sets'));
    sessionStorage.setItem(docRef.id,JSON.stringify(studySet));;
    // firebase does not accept custom objects, so must turn into array of structs
    const sequences = studySet.sequences.map((seq) => ({
      id: seq.id,
      name: seq.name,
      cardList: seq.cardList.map(card => Object.assign({}, card))
    }))
    return defer(() => from(setDoc(docRef, {
      id: docRef.id,
      owner: studySet.owner,
      title: studySet.title,
      description: studySet.description,
      flashcards: studySet.flashcards.map(obj => Object.assign({}, obj)),
      sequences: sequences
    }) as Promise<void> ))
      .pipe(map(() => studySet.id = docRef.id));
  }
}

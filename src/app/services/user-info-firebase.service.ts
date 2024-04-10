import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import {
  Firestore, getFirestore,
  getDoc, setDoc, doc, collection,
  DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, defer, from, map, switchMap, of, take } from 'rxjs';
import { UserData, UserModel } from '../data-models/user-model';
import { StudySetData } from '../data-models/studyset-model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoFirebaseService extends UserInfoService {

  constructor(private firestore: Firestore = getFirestore()) {
    super();
  }

  override loadUser(id: string): Observable<UserData> {
    if (sessionStorage.getItem(id)) {
      const JSONuser = (JSON.parse(sessionStorage.getItem(id)!));
      return of(new UserData(JSONuser.uid,JSONuser._recentSets,JSONuser._ownedSets));
    } else {
      let userVar: UserData;
      let userObservable =  defer(() =>
        from(getDoc(doc(this.firestore, 'users', id)) as Promise<DocumentSnapshot>))
        .pipe(switchMap((docSnap: DocumentSnapshot) =>
          defer(() =>
            !docSnap.exists() ?
              this.saveUser(new UserData(id, [], [])).pipe(map((dbUser) => new UserData(dbUser, [], []))) :
              of(docSnap.data() as UserModel).pipe(map((dbUser: UserModel) => UserData.copyUser(dbUser))
          ))
        ));
      userObservable.pipe(take(1)).subscribe(user => {
        userVar = user;
        sessionStorage.setItem(id,JSON.stringify(userVar));
      });
      return userObservable;
    }
  }

  override saveUser(user: UserData): Observable<string> {
    sessionStorage.setItem(user.uid,JSON.stringify(user));
    let userid = defer(() => from(setDoc(doc(collection(this.firestore, 'users'), user.uid), {
      uid: user.uid,
      ownedSets: user.getOwnedSetsToStore(),
      recentSets: user.getRecentSetsToStore()
    }) as Promise<void> ))
      .pipe(map((ret => user.uid as string)));
    return userid
  }

  override updateViewDate(studySet: StudySetData) {
    this.loadUser(sessionStorage.getItem("uid")!)
    .pipe(take(1)).subscribe(user => {
      user.updateRecentSets({setId: studySet.id! , viewed: new Date()});
      if (studySet.owner) {
        if (studySet.owner === sessionStorage.getItem("uid")) {
        user.updateOwned({setId: studySet.id! , viewed: new Date()});
        }
      }
      this.saveUser(user).subscribe();
    })
  }
}

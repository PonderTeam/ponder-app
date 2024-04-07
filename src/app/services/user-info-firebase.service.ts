import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import {
  Firestore, getFirestore,
  getDoc, setDoc, doc, collection,
  DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, defer, from, map, switchMap, of, iif, take } from 'rxjs';
import { UserData, UserModel } from '../data-models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoFirebaseService extends UserInfoService{

  constructor(private firestore: Firestore = getFirestore()) {
    super();
  }

  override loadUser(id: string): Observable<UserData> {
    if (id === sessionStorage.getItem("userId")){
      const JSONuser = (JSON.parse(sessionStorage.getItem(id)!));
      return of(new UserData(JSONuser.uid,JSONuser._recentSets,JSONuser._ownedSets));
    }
    else{
      sessionStorage.clear()
      let userVar:UserData;
      let userObservable =  defer(() => from(getDoc(doc(this.firestore, 'users', id)) as Promise<DocumentSnapshot>))
        .pipe(switchMap((docSnap: DocumentSnapshot) =>
          iif(() => !docSnap.exists(),
            this.saveUser(new UserData(id, [], [])).pipe(map((dbUser) => new UserData(dbUser, [], []))),
            of(docSnap.data() as UserModel).pipe(map((dbUser: UserModel) => UserData.copyUser(dbUser))
          ))
      ));
      sessionStorage.setItem("userId",id);
      userObservable.pipe(take(1)).subscribe(user => {
        userVar = user;
        sessionStorage.setItem(userVar.uid!,JSON.stringify(userVar));
      });
      return userObservable;

    }
  }

  override saveUser(user: UserData): Observable<string> {
    sessionStorage.setItem(user.uid,JSON.stringify(user));
    return defer(() => from(setDoc(doc(collection(this.firestore, 'users'), user.uid), {
      uid: user.uid,
      ownedSets: user.getOwnedSetsToStore(),
      recentSets: user.getRecentSetsToStore()
    }) as Promise<void> ))
      .pipe(map((ret => user.uid as string)));
  }
}

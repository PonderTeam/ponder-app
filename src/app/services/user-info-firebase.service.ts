import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { Firestore, getFirestore, getDoc, doc, DocumentSnapshot, collection, setDoc } from '@angular/fire/firestore';
import { Observable, defer, from, map, switchMap, of, iif } from 'rxjs';
import { UserData, UserModel } from '../data-models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoFirebaseService extends UserInfoService{

  constructor(private firestore: Firestore = getFirestore()) {
    super();
   }

   override loadUser(id: string): Observable<UserData> {
    return defer(() => from(getDoc(doc(this.firestore, 'users', id)) as Promise<DocumentSnapshot>))
    .pipe(switchMap((docSnap: DocumentSnapshot) =>
      iif(() => !docSnap.exists(),
        this.saveUser(new UserData(id, [], [])).pipe(map((dbUser) => new UserData(dbUser, [], []))),
        of(docSnap.data() as UserModel).pipe(map((dbUser: UserModel) => new UserData(dbUser.uid, dbUser.recentSets, dbUser.ownedSets))
      ))
    ))
   }

   override saveUser(user: UserData): Observable<string> {
    return defer(() => from(setDoc(doc(collection(this.firestore, 'users'), user.uid), {
      uid: user.uid,
      ownedSets: user.getOwnedSets(),
      recentSets: user.getRecentSets()
    }) as Promise<void> ))
    .pipe(map((ret => user.uid as string)))
   }
}

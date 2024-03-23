import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, Auth, signInWithPopup } from '@angular/fire/auth';
import { Observable, defer, from, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService extends AuthService{
  constructor(private auth: Auth = getAuth()) {
    super();
  }

  override signInWithGoogle(): Observable<string>{
    return defer(() => from(signInWithPopup(this.auth, new GoogleAuthProvider))).pipe(
      map((result) =>
      result.user?.uid as string))
  }

  override signOut(): void{
    this.auth.signOut();
  }
}

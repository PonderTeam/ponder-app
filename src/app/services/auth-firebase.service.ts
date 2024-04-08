import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, Auth, signInWithPopup } from '@angular/fire/auth';
import { Observable, defer, from } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService extends AuthService{
  constructor(private auth: Auth = getAuth()) {
    super();
  }

  override signInWithGoogle(): Observable<string>{
    return defer(() => from(signInWithPopup(this.auth, new GoogleAuthProvider)
    .then((result) => {
      sessionStorage.setItem("uid", result.user.uid)
      return result.user.uid;
    })));
  }

  override signOut(): void{
    this.auth.signOut();
    sessionStorage.clear();
  }

  override checkSignIn(): boolean {
      if(sessionStorage.getItem("uid"))
        return true;
      return false;
  }
}

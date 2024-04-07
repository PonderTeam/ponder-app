import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, Auth, signInWithPopup } from '@angular/fire/auth';
import { Observable, defer, from } from 'rxjs';
import { AuthService } from './auth.service';
import { UserInfoService } from '../services/user-info.service';
import { UserData } from '../data-models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService extends AuthService{
  user: UserData = new UserData();
  constructor(private auth: Auth = getAuth(), private userInfoService: UserInfoService) {
    super();
  }

  override signInWithGoogle(): Observable<string>{
    return defer(() => from(signInWithPopup(this.auth, new GoogleAuthProvider)
    .then((result) => {
      this.userInfoService.loadUser(result.user.uid).subscribe(user => [this.user = user])
      sessionStorage.setItem('user', JSON.stringify(this.user))
      return result.user.uid;
    })));
  }

  override signOut(): void{
    this.auth.signOut();
    sessionStorage.removeItem('user')
  }

  override checkSignIn(): boolean {
      if(sessionStorage.getItem("user"))
        return true;
      return false;
  }
}

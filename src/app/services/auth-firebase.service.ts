import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, Auth, signInWithPopup } from '@angular/fire/auth';
import { Observable, defer, from } from 'rxjs';
import { AuthService } from './auth.service';
import { UserInfoService } from '../services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService extends AuthService{
  constructor(private auth: Auth = getAuth(), private userInfoService: UserInfoService) {
    super();
  }

  override signInWithGoogle(): Observable<string>{
    
    return defer(() => from(signInWithPopup(this.auth, new GoogleAuthProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      localStorage.setItem('token', JSON.stringify(credential?.accessToken));
      this.userInfoService.loadUser(result.user.uid)
      return result.user.uid;
    })));
  }

  override signOut(): void{
    this.auth.signOut();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

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
  user: UserData = new UserData;
  constructor(private auth: Auth = getAuth(), private userInfoService: UserInfoService) {
    super();
  }

  override signInWithGoogle(): Observable<string>{
    
    return defer(() => from(signInWithPopup(this.auth, new GoogleAuthProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      localStorage.setItem('token', JSON.stringify(credential?.accessToken));
      this.userInfoService.loadUser(result.user.uid).subscribe(user => [this.user = user])
      localStorage.setItem('user', JSON.stringify(this.user))
      return result.user.uid;
    })));
  }

  override signOut(): void{
    this.auth.signOut();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { UserData } from '../data-models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthDevService extends AuthService{

  constructor() {
    super();
  }

  override signInWithGoogle(): Observable<string> {
    sessionStorage.setItem('user', JSON.stringify(new UserData("user1")))
    return of("user1");
  }

  override signOut(): void {
    sessionStorage.removeItem('user')
  }

  override checkSignIn(): boolean {
    if(sessionStorage.getItem("user"))
      return true;
    return false;
  }
}

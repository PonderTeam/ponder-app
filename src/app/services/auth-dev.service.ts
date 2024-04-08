import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDevService extends AuthService{

  constructor() {
    super();
  }

  override signInWithGoogle(): Observable<string> {
    sessionStorage.setItem("uid", "user");
    return of("user");
  }

  override signOut(): void {
    sessionStorage.clear();
  }

  override checkSignIn(): boolean {
    if(sessionStorage.getItem("uid")) {
      return true;
    }
    return false;
  }
}

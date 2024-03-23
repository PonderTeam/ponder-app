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
      return of("user1");
  }

  override signOut(): void {

  }
}

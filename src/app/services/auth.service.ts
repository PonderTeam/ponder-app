import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  abstract signInWithGoogle(): Observable<string>;

  abstract signOut(): void;

  abstract checkSignIn(): boolean;
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract class that defines the standard methods for all Auth Services.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  /**
   * Signs in the user and return's the uid
   */
  abstract signInWithGoogle(): Observable<string>;

  /**
   * Invalidates user session and signs out user
   */
  abstract signOut(): void;

  /**
   * Checks that a user is signed in
   */
  abstract checkSignIn(): boolean;
}

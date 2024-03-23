import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, Auth, signInWithPopup } from '@angular/fire/auth';
import { Observable, defer, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  abstract signInWithGoogle(): Observable<string>;

  abstract signOut(): void;
}

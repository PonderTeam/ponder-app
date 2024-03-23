import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @Output() signIn = new EventEmitter<any>();
  @Input() signOut = false;
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // signInWithRedirect(auth, provider){
  //   this.auth = auth;
  //   this.provider = provider;
  // }
}

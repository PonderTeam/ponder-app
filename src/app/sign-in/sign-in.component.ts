import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

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

  constructor(private auth: AuthService) {}

  signInWithGoogle(){
    this.auth.signInWithGoogle().subscribe(result => {
      this.signIn.emit();
    });
  }
}

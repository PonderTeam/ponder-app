import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @Output() signIn = new EventEmitter<any>();
}

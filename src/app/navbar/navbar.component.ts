import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TopSearchBarComponent } from '../top-search-bar/top-search-bar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
    TopSearchBarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() signedIn:boolean = false;
  @Output() signingOut = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

  signOut() {
    this.auth.signOut();
    this.signingOut.emit()
  }
}

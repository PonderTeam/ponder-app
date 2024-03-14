import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { StudySetService } from './services/study-set.service';
import { StudySetDevService } from './services/study-set-dev.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, FormsModule, NavbarComponent, SignInComponent, EditCreateStudySetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: StudySetService, useClass: StudySetDevService }
  ]
})
export class AppComponent {
  title = 'Ponder';
  signedIn = false;
}

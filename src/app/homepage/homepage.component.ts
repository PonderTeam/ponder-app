import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule,RouterLink } from '@angular/router';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterModule,RouterLink, SetPreviewCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

}

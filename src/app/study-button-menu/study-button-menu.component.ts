import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-study-button-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatMenuTrigger, MatIconModule, RouterLink, NgIf],
  templateUrl: './study-button-menu.component.html',
  styleUrl: './study-button-menu.component.scss'
})
export class StudyButtonMenuComponent {
  @Input() setId?: string;
  @Input() showSequenceSelection: number = 0;
}

import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { StudySetDevService } from '../services/study-set-dev.service';

@Component({
  selector: 'app-sequence-editor',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, FlashcardComponent,FlashcardEditorComponent],
  templateUrl: './sequence-editor.component.html',
  styleUrl: './sequence-editor.component.scss'
})
export class SequenceEditorComponent {
  cardScaleFactor: number = window.innerWidth * (880 / 1280) / 1700;
  studysetdevservice = inject(StudySetDevService);
  data = [ this.studysetdevservice.getStudySet("cccc"),
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = window.innerWidth * (880 / 1280) / 1700;
  }

  inSequence: boolean = false;
  addToSequence(e: Event) {
    e.stopPropagation();
    this.inSequence = true;
  }
}


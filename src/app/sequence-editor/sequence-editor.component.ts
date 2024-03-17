import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { StudySetService } from '../services/study-set.service';
import { SequenceData } from '../data-models/sequence-model';

@Component({
  selector: 'app-sequence-editor',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, FlashcardComponent,FlashcardEditorComponent],
  templateUrl: './sequence-editor.component.html',
  styleUrl: './sequence-editor.component.scss'
})
export class SequenceEditorComponent {
  constructor(private studySetService: StudySetService) {};
  cardScaleFactor: number = window.innerWidth * (880 / 1280) / 1700;
  sequences: SequenceData[] = []; //araray of empty sequnexcs
  //isLoaded: boolean = false; // async

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = window.innerWidth * (880 / 1280) / 1700;
  }

  inSequence: boolean = !false;
  addToSequence(e: Event) {
    e.stopPropagation();
    this.inSequence = !true;
  }

  getStudySet(setId: string = "bbbb") { //hardcoded
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.sequences = sSet.sequences,
        //this.isLoaded = true,
        console.log("before", this.sequences)
      ]);
  }

  ngOnInit() { //temporary til Ashley PR mained
    this.getStudySet();
  }
}

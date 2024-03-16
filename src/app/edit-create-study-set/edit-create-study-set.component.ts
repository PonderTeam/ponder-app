import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { SequenceEditorComponent } from '../sequence-editor/sequence-editor.component';
import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';

@Component({
  selector: 'app-edit-create-study-set',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CustomTabsModule,
    RouterLink,
    FlashcardEditorComponent,
    SequenceEditorComponent],
  templateUrl: './edit-create-study-set.component.html',
  styleUrl: './edit-create-study-set.component.scss'
})
export class EditCreateStudySetComponent {
  @Input() setId: string | undefined;
  @Input() userId: string = "there wasn't a userId passed to this"; // remove later
  studySet: StudySetData = new StudySetData(this.userId);
  isLoaded: boolean = false;
  constructor(private studySetService: StudySetService) {};

  ngOnInit() {
    if (this.setId) {
      this.getStudySet(this.setId);
    } else {
      this.studySet.addCard();
      this.isLoaded = true;
    }
  }

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
        this.isLoaded = true
      ]);
  }
}

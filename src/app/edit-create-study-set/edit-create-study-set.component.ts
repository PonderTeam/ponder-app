import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { SequenceEditorComponent } from '../sequence-editor/sequence-editor.component';

@Component({
  selector: 'app-edit-create-study-set',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatInputModule,MatFormFieldModule,FormsModule,MatButtonToggleModule, CustomTabsModule,
            MatCardModule, MatIconModule, RouterLink, FlashcardComponent,FlashcardEditorComponent,SequenceEditorComponent],
  templateUrl: './edit-create-study-set.component.html',
  styleUrl: './edit-create-study-set.component.scss'
})
export class EditCreateStudySetComponent {
  title = '';
  description = '';
}

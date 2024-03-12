import { Component} from '@angular/core';
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

@Component({
  selector: 'app-flashcard-editor',
  standalone: true,
  imports: [CommonModule ,MatButtonModule, MatInputModule, MatFormFieldModule,FormsModule,MatButtonToggleModule,
            MatCardModule, MatIconModule, FlashcardComponent],
  templateUrl: './flashcard-editor.component.html',
  styleUrl: './flashcard-editor.component.scss'
})
export class FlashcardEditorComponent {
  term = '';
  definition = '';
}

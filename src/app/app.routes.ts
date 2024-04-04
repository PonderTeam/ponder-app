import { Routes } from '@angular/router';
import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StudyFlashcardComponent } from './study-flashcard/study-flashcard.component';
import { StudySequenceComponent } from './study-sequence/study-sequence.component';
import { ViewStudySetComponent } from './view-study-set/view-study-set.component';

export const routes: Routes = [
  {
    path: 'edit-set',
    component: EditCreateStudySetComponent,
    title:'Edit Create Study Set Page'
  },
  {
    path: 'home-page',
    component: HomepageComponent,
    title: 'Home Page'
  },
  {
    path: 'study-flashcard',
    component: StudyFlashcardComponent,
    title:'Study Flashcard Page'
  },
  {
    path: 'study-sequence',
    component: StudySequenceComponent,
    title:'Study Sequence Page'
  },
  {
    path: 'view-set',
    component: ViewStudySetComponent,
    title:'View Study Set Page'
  },
  {
    path: '',
    redirectTo:'/home-page',
    pathMatch: 'full'
  }
];

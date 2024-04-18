import { Routes } from '@angular/router';
import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StudyFlashcardComponent } from './study-flashcard/study-flashcard.component';
import { StudySequenceComponent } from './study-sequence/study-sequence.component';
import { ViewStudySetComponent } from './view-study-set/view-study-set.component';
import { SearchPageComponent } from './search-page/search-page.component';

export const routes: Routes = [
  {
    path: 'edit-set',
    component: EditCreateStudySetComponent,
    title: 'Edit Study Set'
  },
  {
    path: 'home-page',
    component: HomepageComponent,
    title: 'Home'
  },
  {
    path: 'study-flashcard',
    component: StudyFlashcardComponent,
    title: 'Study Flashcard'
  },
  {
    path: 'study-sequence',
    component: StudySequenceComponent,
    title: 'Study Sequence'
  },
  {
    path: 'view-set',
    component: ViewStudySetComponent,
    title: 'View Study Set'
  },
  {
    path: 'search-results',
    component: SearchPageComponent,
    title: 'Search Results'
  },
  {
    path: '',
    redirectTo:'/home-page',
    pathMatch: 'full'
  }
];

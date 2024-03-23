import { Routes } from '@angular/router';
import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudyFlashcardComponent } from './study-flashcard/study-flashcard.component';
import { StudySequenceComponent } from './study-sequence/study-sequence.component';
import { ViewstudysetComponent } from './viewstudyset/viewstudyset.component';

export const routes: Routes = [
  {
    path: 'edit-set',
    component: EditCreateStudySetComponent,
    title:'Edit Create Study Set Page'
  },
  {
    path: '',
    component: HomepageComponent,
    title: 'Home Page'
  },
  {
    path: 'studyFlashcard',
    component: StudyFlashcardComponent,
    title:'Study Flashcard Page'
  },
  {
    path: 'studySequence',
    component: StudySequenceComponent,
    title:'Study Sequence Page'
  },
  {
    path: 'viewStudySet',
    component: ViewstudysetComponent,
    title:'View Study Set Page'
  },
];

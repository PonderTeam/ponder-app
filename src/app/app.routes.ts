import { Routes } from '@angular/router';
import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudyFlashcardComponent } from './study-flashcard/study-flashcard.component';
import { StudySequenceComponent } from './study-sequence/study-sequence.component';

export const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
    title:'Sign In Page'
  },
  {
    path: 'editCreateSet',
    component: EditCreateStudySetComponent,
    title:'Edit Create Study Set Page'
  },
  {
    path: 'homepage',
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

];

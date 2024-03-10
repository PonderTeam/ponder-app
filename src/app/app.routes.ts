import { Routes } from '@angular/router';
// import { HomepageComponent } from './homepage/homepage.component';
// import { EditCreateStudySetComponent } from './edit-create-study-set/edit-create-study-set.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudyFlashcardComponent } from './study-flashcard/study-flashcard.component';

export const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
    title:'Sign In Page'
  },
  // {
  //   path: 'homepage',
  //   component: HomepageComponent,
  //   title: 'Home Page'
  // },
  // {
  //   path: 'editCreateSet',
  //   component: EditCreateStudySetComponent,
  //   title:'Edit Create Study Set Page'
  // },
  {
    path: 'studyFlashcard',
    component: StudyFlashcardComponent,
    title:'Study Flashcard Page'
  },

];

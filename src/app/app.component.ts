import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudySetFirebaseService } from './services/study-set-firebase.service';
import { StudySetData } from './data-models/studyset-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, FormsModule, NavbarComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ponder';
  signedIn = false;
  constructor(private setService: StudySetFirebaseService){
    console.log("Component made");
    // Creating a set to add to the database. This is not a valid set. I too am lazy
    let localSet = new StudySetData("user1", "Saved Set", "This set was saved");
    // Saving the set to the database
    setService.saveStudySet(localSet).subscribe(thing => console.log("set saved", thing));
    // Get a study set (set id pulled straight from firebase)
    setService.getStudySet("BaiBiNNiZgZbnEMjxWna").subscribe(thing => console.log("get", thing));
    // Editing study set
    let preExistingSet = new StudySetData("new owner", "new title", "new description", [], [], "1gq3A6Blukc2tHVLghVW");
    // Update set
    setService.saveStudySet(preExistingSet).subscribe(thing => console.log("set updated", thing));
    // Get many sets
    setService.getStudySets(["BaiBiNNiZgZbnEMjxWna", "1gq3A6Blukc2tHVLghVW"]).subscribe(thing => console.log("get many", thing));
    // Reset db
    setService.saveStudySet(new StudySetData("user1", "water cycle", "this will change", [], [], "1gq3A6Blukc2tHVLghVW")).subscribe(thing => console.log("set reset", thing));
  }
}

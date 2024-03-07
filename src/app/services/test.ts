import { inject } from "@angular/core";
import { FlashcardData, FlashcardModel } from "../data-models/flashcard-model";
import { StudySetDevService } from "./study-set-dev.service";
import { StudySetData } from "../data-models/studyset-model";

let service = new StudySetDevService();
let StudySet = service.getStudySet(0)
  .then(obj => console.log(obj.isValid()));



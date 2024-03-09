import { SequenceData } from "./src/app/data-models/sequence-model";
import { StudySetData } from "./src/app/data-models/studyset-model";
import { StudySetDevService } from "./src/app/services/study-set-dev.service";

const url = require('url');
let service = new StudySetDevService();
let localSet = new StudySetData("me", "Made in code", "this test shows how the code works");
console.log("Our new set:", localSet);
console.log("Set is valid:", localSet.isValid());
console.log("Adding Cards to Set...");
localSet.addCard("card1", "this is card1");
localSet.addCard("card2", "this is card2");
localSet.addCard("lemon", "this is a lemon", url.pathToFileURL('./src/assets/images/lemon-pic.jpeg'));
console.log("Our set now:", localSet);
console.log("Set is valid:", localSet.isValid());
console.log("Lemon image url:", localSet.flashcards[2].image);
console.log("Let's add a sequence");
localSet.addSequence("first sequence", localSet.flashcards);
console.log("Let's reorder the flashcards");
console.log("Original Order", localSet.flashcards);
localSet.reorderCard(localSet.flashcards[1],0);
console.log("New Order", localSet.flashcards);
console.log("Let's delete a flashcard");
localSet.deleteCard(localSet.flashcards[0]);
console.log("Our set now:", localSet);
console.log("Our sequence:", localSet.sequences[0]);
console.log("Let's send the set to the server...");
let foo = service.saveStudySet(localSet)
  .then(responseSet => console.log("Updated set with server determined id\n", responseSet));

// // this might happen out of order to due async. tsx does not allow "await" at top level
// console.log("Let's get a different set from the server...");
// let bar = service.getStudySet("1111")
//   .then(responseSet => console.log("The set from server:\n", responseSet));

console.log(new Date());

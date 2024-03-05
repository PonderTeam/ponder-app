import { FlashcardModel } from "./flashcard-model";
import { SequenceModel } from "./sequence-model";

export interface StudySetModel {
  /** User who created set */
  owner: string;
  /** name of study set */
  name: string;
  description: string;
  /** list of flashcards in study set */
  flashcards: FlashcardModel[];
  /** list of sequences in study set */
  sequences: SequenceModel[];
  /** Checks if the study set is valid. A valid study set cannot have an empty
   *  owner or name, and must contain at least one flashcard. All its flashcards and
   * sequences must also be valid. Sequences must also only include flashcards from the
   * Study Set
   */
  isValid(): boolean;
}

export class StudySetData implements StudySetModel {
  owner: string;
  name: string;
  description: string;
  flashcards: FlashcardModel[];
  sequences: SequenceModel[];

  constructor(
    owner: string,
    name: string,
    description: string,
    flashcards: FlashcardModel[],
    sequences: SequenceModel[]
  ) {
    this.owner = owner;
    this.name = name.trim();
    this.description = description.trim();
    this.flashcards = flashcards;
    this.sequences = sequences;
  }

  isValid(): boolean {
    // Check set has a name, owner and flashcards
    if (!this.name || !this.owner || !this.flashcards || this.flashcards.length < 1) {
      return false
    };
    // Check all flashcards are valid
    for (const card of this.flashcards) {
      if (!card.isValid()) { return false };
    }
    // Check all sequences are valid
    var cardSet = new Set(this.flashcards);
    for (const seq of this.sequences) {
      if (!seq.isValid()) { return false };
      for (const card of seq.cardList) {
        // Check all cards in sequences are included in the flashcard list
        if (!cardSet.has(card)) {
          return false;
        }
      }
    }
    return true;
  }
}

import { FlashcardModel } from "./flashcard-model";
import { SequenceModel } from "./sequence-model";

export interface StudySetModel {
  readonly id: number;
  /** User who created set */
  owner: string;
  /** name of study set */
  title: string;
  description: string;
  /** list of flashcards in study set */
  flashcards: FlashcardModel[];
  /** list of sequences in study set */
  sequences: SequenceModel[];
  /**
   * Checks if the study set is valid. A valid study set cannot have an empty
   * owner or name, and must contain at least one flashcard. All its flashcards and
   * sequences must also be valid. Sequences must also only include flashcards from the
   * Study Set.
   */
  isValid(): boolean;
}

export class StudySetData implements StudySetModel {
  readonly id: number;
  owner: string;
  title: string;
  description: string;
  flashcards: FlashcardModel[];
  sequences: SequenceModel[];

  constructor(
    owner: string,
    title: string,
    description: string,
    flashcards: FlashcardModel[] = [],
    sequences: SequenceModel[] = [],
    id: number = -1
  ) {
    this.owner = owner;
    this.title = title.trim();
    this.description = description.trim();
    this.flashcards = flashcards;
    this.sequences = sequences;
    this.id = id;
  }

  isValid(): boolean {
    // Check set has a name, owner and flashcards
    if (!this.title || !this.owner || !this.flashcards || this.flashcards.length < 1) {
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



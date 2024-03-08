import { FlashcardData, FlashcardModel } from "./flashcard-model";
import { SequenceData, SequenceModel } from "./sequence-model";

export interface StudySetModel {
  /** A unique string/key */
  id?: string;
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
  readonly id?: string;
  owner: string;
  title: string;
  description: string;
  flashcards: FlashcardModel[];
  sequences: SequenceModel[];

  constructor(
    owner: string = "",
    title: string = "",
    description: string = "",
    flashcards: FlashcardModel[] = [],
    sequences: SequenceModel[] = [],
    id?: string
  ) {
    this.owner = owner;
    this.title = title.trim();
    this.description = description.trim();
    this.flashcards = flashcards;
    this.sequences = sequences;
    this.id = id = id;
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

  /**
   * Will rebuild sequences to reference Flashcard objects in
   * flashcards collection rather using duplicated Flashcard objects.
   * Run this method when pulling after requesting data from a server that
   * stores duplicated data.
   */
  rebuildSequences(): void {
    // Check if there are no sequences
    if (this.sequences.length == 0) {
      return
    }
    // Create lookup table
    const cardMap = new Map(this.flashcards.map(card => [card.id, card]))

    this.sequences.forEach(seq =>
      seq.cardList.forEach(card =>
        // will not return undefined as long as valid study set
        card = cardMap.get(card.id)!
      )
    )
  }

  static copyStudySet(oldSet: StudySetModel): StudySetData {
    let newSet = new StudySetData(
      oldSet.owner,
      oldSet.title,
      oldSet.description,
      Array(oldSet.flashcards.length),
      Array(oldSet.sequences.length),
      oldSet.id
    );
    oldSet.flashcards.forEach((card, index) =>
      newSet.flashcards[index] = FlashcardData.copyFlashcard(card)
    )
    oldSet.sequences.forEach((seq, index) =>
      newSet.sequences[index] = SequenceData.copySequence(seq)
    )
    newSet.rebuildSequences();
    return newSet;
  }
}



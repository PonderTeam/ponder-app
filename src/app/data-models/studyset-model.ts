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
  private nextFid = 0;  // next available flashcard id
  private nextSid = 0; // next available sequence id

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
    this.id = id;
    this.initiateNextIds();
  }

  isValid(): boolean {
    // Check set has a name, owner and flashcards
    if (!this.title || !this.owner || !this.flashcards || this.flashcards.length < 1) {
      return false;
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
   * Initiates the next available flashcard and sequence id.
   */
  private initiateNextIds(): void {
    let high: number = 0;
    for (const card of this.flashcards) {
      if (!card) {
        break;
      } else if (high < card.id) {
        high = card.id;
      }
    }
    this.nextFid = high + 1; // set the next available id

    high = 0; // reset high

    for (const seq of this.sequences) {
      if (!seq) {
        break;
      } else if (high < seq.id) {
        high = seq.id;
      }
    }
    this.nextSid = high + 1; // set the next available id
  }

  /**
   * Increments the next available flashcard id.
   */
  private incrementNextFid() {
    this.nextFid++; // simple wrapper incase we change this algo
  }

  /**
   * Increments the next available sequence id.
   */
  private incrementNextSid() {
    this.nextSid++; // simple wrapper incase we change this algo
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
      return;
    }
    // Create lookup table
    const cardMap = new Map(this.flashcards.map(card => [card.id, card]))

    this.sequences.forEach(seq =>
      seq.cardList = seq.cardList.map(card =>
        // will not return undefined as long as valid study set
        cardMap.get(card.id)!
      )
    );
  }

  /**
   * Makes a copy of StudySetData Object from a "study set like" object.
   */
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
    );
    oldSet.sequences.forEach((seq, index) =>
      newSet.sequences[index] = SequenceData.copySequence(seq)
    );
    newSet.rebuildSequences();
    newSet.initiateNextIds();
    return newSet;
  }

  /**
   * Moves a card to new position in the flashcard list and shifts the other cards
   * to accommodate the reorder.
   * @param card flashcard to move
   * @param to index to move card "to"
   * @returns 1 if move succeeded, 0 if card not found, -1 if pos outside range.
   */
  reorderCard(card: FlashcardModel, to: number): number {
    if (!(to >= 0 && to < this.flashcards.length)) {
      return -1; // outside range
    }
    const from = this.flashcards.indexOf(card, 0);
    if (from > -1) {
      this.flashcards.splice(from, 1)
      this.flashcards.splice(to, 0, card)
      return 1; // success
    }
    return 0; // card not found
  }

  /** Create and add a flashcard to the study set. */
  addCard(term: string, definition: string, image?: URL): void {
    this.flashcards.push(new FlashcardData(term, definition, image, this.nextFid));
    this.incrementNextFid();
  }

  /** Removed a card from flashcard list and sequences. */
  deleteCard(card: FlashcardModel): boolean {
    // lookup is O(n) but deletes won't be too common
    const index = this.flashcards.indexOf(card, 0);
    if (index > -1) {
      this.flashcards.splice(index, 1)
      for (const seq of this.sequences) {
        if (!seq) {
          continue;
        }
        // force cast masks errors by returning undefined if not an instance of SequenceData
        ((seq as unknown) as SequenceData).removeCard(card);
      }
      return true;
    }
    return false;
  }

  /** Creates a sequence in the study set */
  addSequence(name: string, cardList: FlashcardModel[] = []): void {
    this.sequences.push(new SequenceData(name, cardList, this.nextSid));
    this.incrementNextSid();
  }

  /** Deletes a sequence from the study set */
  deleteSequence(seq: SequenceData): void {
    const index = this.sequences.indexOf(seq, 0);
    if (index > -1) {
      this.flashcards.splice(index, 1);
    }
  }
}



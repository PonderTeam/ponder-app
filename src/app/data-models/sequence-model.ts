import { FlashcardData, FlashcardModel } from "./flashcard-model";

export interface SequenceModel {
  readonly id: number;
  /** name of the sequence */
  name: string;
  /** ordered list of flashcards in sequence */
  cardList: FlashcardModel[];

  /**
   * Checks if the sequence is valid. Valid sequences cannot have an empty name and
   * must have more than 1 flashcard in their card list.
   * @returns whether sequence is in a valid state
   */
  isValid(): boolean;

  /** Adds a card to the sequence. */
  addCard(card: FlashcardData): void;

  /**
   * Removes a flashcard from the sequence.
   * @param card card to remove
   * @returns true is card was found and removed.
   */
  removeCard(card: FlashcardData): boolean;

  /**
   * Moves a card to new position in the sequence and shifts the other cards
   * to accommodate the reorder.
   * @param card flashcard to move in sequence
   * @param to index to move card "to"
   * @returns 1 if move succeeded, 0 if card not found, -1 if pos outside range.
   */
  reorderCard(card: FlashcardModel, to: number): number;
}

export class SequenceData implements SequenceModel {
  readonly id: number;
  name: string;
  cardList: FlashcardModel[];

  constructor(name: string, cardList: FlashcardModel[] = [], id: number = -1) {
    this.name = name.trim();
    this.cardList = cardList;
    this.id = id;
  }

  isValid() {
    if (this.name && this.cardList && this.cardList.length > 1) {
      return true;
    }
    return false;
  }

  /**
   * Creates a deep copy of a sequence.
   */
  static copySequence(oldSeq: SequenceModel): SequenceData {
    let newSeq = new SequenceData(oldSeq.name, Array(oldSeq.cardList.length), oldSeq.id);
    newSeq.cardList = oldSeq.cardList.map(card=>
      FlashcardData.copyFlashcard(card)!
    );
    return newSeq
  }

  addCard(card: FlashcardData): void {
    this.cardList.push(card);
  }

  removeCard(card: FlashcardData): boolean {
    const startLen = this.cardList.length;
    this.cardList = this.cardList.filter(i => i != card)
    return startLen != this.cardList.length
  }

  reorderCard(card: FlashcardModel, to: number): number {
    if (!(to >= 0 && to < this.cardList.length)) {
      return -1 // outside range
    }
    const from = this.cardList.indexOf(card, 0);
    if (from > -1) {
      this.cardList.splice(from, 1)
      this.cardList.splice(to, 0, card)
    }
    return 0; // card not found
  }
}

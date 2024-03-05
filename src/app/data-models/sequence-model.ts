import { FlashcardModel } from "./flashcard-model";

export interface SequenceModel {
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
}

export class SequenceData implements SequenceModel {
  public name: string;
  public cardList: FlashcardModel[];

  constructor(name: string, cardList: FlashcardModel[]) {
    this.name = name.trim();
    this.cardList = cardList;
  }

  isValid() {
    if (this.name && this.cardList && this.cardList.length > 1) {
      return true;
    }
    return false;
  }
}

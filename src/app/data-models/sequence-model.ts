import { IFlashcardModel } from "./flashcard-model";

export interface ISequenceModel {
  /** name of the sequence */
  name: string;
  /** ordered list of flashcards in sequence */
  cardList: IFlashcardModel[];

  /**
   * Checks if the sequence is valid. Valid sequences cannot have an empty name and
   * must have more than 1 flashcard in their card list.
   * @returns whether sequence is in a valid state
   */
  isValid(): boolean;
}

export class SequenceModel implements ISequenceModel {
  public name: string;
  public cardList: IFlashcardModel[];

  constructor(name: string, cardList: IFlashcardModel[]) {
    this.name = name;
    this.cardList = cardList;
  }

  isValid() {
    if (this.name.length > 0 && this.cardList.length > 1) {
      return true;
    }
    return false;
  }
}

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
    let newSeq = new SequenceData(oldSeq.name, Array(oldSeq.cardList.length));
    newSeq.cardList = oldSeq.cardList.map(card=>
      FlashcardData.copyFlashcard(card)!
    );
    return newSeq
  }
}

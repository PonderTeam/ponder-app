export interface FlashcardModel {
  readonly id: number;
  term: string;
  definition: string;
  image?: URL;
  /**
   * Checks if the flashcard is valid. Valid flashcards cannot have an empty
   * term nor definition;
   * @returns whether flashcard is valid
   */
  isValid(): boolean;
  /** Checks if the flashcard has an image. */
  hasImage(): boolean;
}

export class FlashcardData implements FlashcardModel{
  readonly id: number;
  term: string;
  definition: string;
  image?: URL = undefined;

  constructor(term: string = "", definition: string = "", image?: URL, id: number = -1) {
    this.term = term.trim();
    this.definition = definition.trim();
    this.image = image;
    this.id = id;
  }

  static copyFlashcard(card: FlashcardModel): FlashcardData {
    return new FlashcardData(card.term, card.definition, card.image, card.id);
  }

  isValid(): boolean {
      if(this.term.length > 0 && this.definition.length > 0) {
        return true;
      }
      return false;
  }

  hasImage(): boolean {
    if (this.image) { return true };
    return false;
  }
}

export interface FlashcardModel {
  term: string;
  definition: string;
  image?: URL;
  /** Checks if the flashcard is valid. Valid flashcards cannot have an empty
   * term nor definition;
   * @returns whether flashcard is valid
   */
  isValid(): boolean;
  /** Checks if the flashcard has an image. */
  hasImage(): boolean;
}

export class FlashcardData implements FlashcardModel{
  public term: string;
  public definition: string;
  public image?: URL = undefined;

  constructor(term: string, definition: string, image?: URL) {
    this.term = term.trim();
    this.definition = definition.trim();
    this.image = image
  }

  isValid(): boolean {
      if(this.term.length > 0 && this.definition.length > 0) {
        return true;
      }
      return false;
  }

  hasImage(): boolean {
    if (this.image) { return true }
    return false;
  }
}

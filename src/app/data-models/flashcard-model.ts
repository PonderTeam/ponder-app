export interface FlashcardModel {
  term: string;
  definition: string;
  /** Checks if the flashcard is valid. Valid flashcards cannot have an empty
   * term nor definition;
   * @returns whether flashcard is valid
   */
  isValid(): boolean;
}

export class FlashcardData implements FlashcardModel{
  public term: string;
  public definition: string;

  constructor(term: string, definition: string) {
    this.term = term.trim();
    this.definition = definition.trim();
  }

  isValid(): boolean {
      if(this.term.length > 0 && this.definition.length > 0) {
        return true;
      }
      return false;
  }
}

interface IFlashcardModel {
  term: string;
  definition: string;
  /** Checks if the flashcard is valid. Valid flashcards cannot have an empty
   * term nor definition;
   * @returns whether flashcard is valid
   */
  isValid(): boolean;
}

class FlashcardModel implements IFlashcardModel{
  public term: string;
  public definition: string;

  constructor(term: string, definition: string, id: number) {
    this.term = term;
    this.definition = definition;
  }

  isValid(): boolean {
      if(this.term.length > 0 && this.definition.length > 0) {
        return true;
      }
      return false;
  }

}
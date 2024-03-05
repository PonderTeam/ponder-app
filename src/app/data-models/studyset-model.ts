import { FlashcardModel } from "./flashcard-model";
import { SequenceModel } from "./sequence-model";

export interface StudySetModel {
  /** User who created set */
  owner: string;
  /** name of study set */
  name: string;
  description: string;
  /** list of flashcards in study set */
  flashcards: FlashcardModel[];
  /** list of sequences in study set */
  sequences: SequenceModel[];
  /** Checks if the study set is valid. A valid study set cannot have an empty
   *  owner or name, and must contain at least one flashcard. */
  isValid(): boolean;
}

export class StudySetData implements StudySetModel {
  owner: string;
  name: string;
  description: string;
  flashcards: FlashcardModel[];
  sequences: SequenceModel[];

  constructor(
    owner: string,
    name: string,
    description: string,
    flashcard: FlashcardModel[],
    sequences: SequenceModel[]
  ) {
    this.owner = owner;
    this.name = name;
    this.description = description;
    this.flashcards = flashcard;
    this.sequences = sequences;
  }

  isValid(): boolean {
    throw new Error("Method not implemented.");
  }
}

import { IFlashcardModel } from "./flashcard-model";
import { ISequenceModel } from "./sequence-model";

export interface IStudySetModel {
  /** User who created set */
  owner: string;
  /** name of study set */
  name: string;
  description: string;
  /** list of flashcards in study set */
  flashcards: IFlashcardModel[];
  /** list of sequences in study set */
  sequences: ISequenceModel[];
  /** Checks if the study set is valid. A valid study set cannot have an empty
   *  owner or name, and must contain at least one flashcard. */
  isValid(): boolean;
}

export class StudySetModel implements IStudySetModel {
  owner: string;
  name: string;
  description: string;
  flashcards: IFlashcardModel[];
  sequences: ISequenceModel[];

  constructor(
    owner: string,
    name: string,
    description: string,
    flashcard: IFlashcardModel[],
    sequences: ISequenceModel[]
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

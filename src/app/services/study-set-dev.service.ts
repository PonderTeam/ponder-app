import { Injectable } from '@angular/core';
import { StudySetService } from './study-set.service';
import { StudySetData, StudySetModel } from '../data-models/studyset-model';
import { FlashcardData, FlashcardModel } from '../data-models/flashcard-model';
import { SequenceData, SequenceModel } from '../data-models/sequence-model';

// only available in this file
interface dbSequence {
  id: number;
  name: string;
  cardList: number[];
}

interface dbStudySet {
  id: number;
  owner: string;
  title: string;
  description: string;
  flashcards: FlashcardModel[];
  sequences: dbSequence[];
}

// @Injectable({
//   providedIn: 'root'
// })
export class StudySetDevService extends StudySetService{
  url = 'http://localhost:3000/';
  override async getStudySet(id: number): Promise<StudySetData> {
    const studySet = await fetch(`${this.url}${id}`)
      .then(response => response.json())
      .then(obj => this.convertSetData(obj))
    return studySet;
  }
  override async getStudySets(ids: number[]): Promise<StudySetData[]> {
    throw new Error('Method not implemented.');
  }
  override async saveStudySet(studySet: StudySetModel[]): Promise<number> {
    throw new Error('Method not implemented.');
  }

  private convertSetData(dbSet: dbStudySet): StudySetData{
    // Create array of flashcards from response
    let flashcards: FlashcardData[] = dbSet.flashcards
      .map(card => FlashcardData.copyFlashcard(card));

    // Create a lookup map
    const flashcardMap = new Map(flashcards.map(card => [card.id, card]));

    // Create the sequences
    let sequences: SequenceData[] = [];
    (dbSet.sequences).forEach(seq => {
      let cardList: FlashcardData[] = seq.cardList.map(id => flashcardMap.get(id)!)
      sequences.push(new SequenceData(seq.name, cardList, seq.id))
    })

    return new StudySetData(
        dbSet.owner,
        dbSet.title,
        dbSet.description,
        flashcards, sequences,
        dbSet.id
      )
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../data-models/user-model';
import { StudySetData } from '../data-models/studyset-model';

@Injectable({
  providedIn: 'root'
})
export abstract class UserInfoService {
  abstract loadUser(id: string): Observable<UserData>;

  abstract saveUser(user: UserData): Observable<string>;

  abstract updateViewDate(studySet: StudySetData): void;
}

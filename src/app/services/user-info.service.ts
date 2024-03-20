import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../data-models/user-model';

@Injectable({
  providedIn: 'root'
})
export abstract class UserInfoService {
  abstract loadUser(id: string): Observable<UserData>;

  abstract saveUser(user: UserData): Observable<string>;
}

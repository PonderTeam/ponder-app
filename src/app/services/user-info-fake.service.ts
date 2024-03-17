import { Injectable } from '@angular/core';
import { AccessStorageData, UserData } from '../data-models/user-model';
import { of, Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

interface UserServerData{
  id: string;
}

interface UserSetHistory{
  id: string;
  studySets: AccessStorageData[]
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoFakeService extends UserInfoService{
  // will always return user1 regardless of what is passed
  override loadUser(id: string): Observable<UserData> {
    const setList: AccessStorageData[] = [
      {
        "setId": "aaaa",
        "viewed": "2024-03-09T19:22:41.101Z"
      },
      {
        "setId": "bbbb",
        "viewed": "2024-03-09T19:23:20.003Z"
      },
      {
        "setId": "cccc",
        "viewed": "2024-03-09T19:32:33.420Z"
      }
    ];
    return of(new UserData("user1", setList, setList));
  }

  override saveUser(user: UserData): Observable<string> {
    // This is not fully implemented. I changed the abstract class to include this method,
    // so I needed placeholder things
    return of("");
  }
}

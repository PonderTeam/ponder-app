import { Injectable } from '@angular/core';
import { AccessStorageData, AccessData, UserData } from '../data-models/user-model';
import { of, Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoFakeService extends UserInfoService {
  override loadUser(id: string): Observable<UserData> {

    if (sessionStorage.getItem(id)) {
      const JSONuser = (JSON.parse(sessionStorage.getItem(id)!));
      return of(new UserData(JSONuser.uid,JSONuser._recentSets,JSONuser._ownedSets));
    } else {
      const setList: AccessStorageData[] = [
        {
          "setId": "aaaa",
          "viewed": "2023-03-09T19:22:41.101Z"
        },
        {
          "setId": "bbbb",
          "viewed": "2024-03-09T19:23:20.003Z"
        },
        {
          "setId": "cccc",
          "viewed": "2024-03-09T19:32:33.420Z"
        },
        {
          "setId": "dddd",
          "viewed": "2022-04-14T19:32:33.420Z"
        },
        {
          "setId": "eeee",
          "viewed": "2021-09-14T19:32:33.420Z"
        },
        {
          "setId": "ffff",
          "viewed": "2022-02-02T19:32:33.420Z"
        },
        {
          "setId": "gggg",
          "viewed": "2022-01-11T19:32:33.420Z"
        },
        {
          "setId": "hhhh",
          "viewed": "2021-12-12T19:32:33.420Z"
        },
        {
          "setId": "iiii",
          "viewed": "2021-11-30T19:32:33.420Z"
        },
        {
          "setId": "jjjj",
          "viewed": "2021-10-16T19:32:33.420Z"
        },
        {
          "setId": "llll",
          "viewed": "2022-03-30T19:32:33.420Z"
        }
      ];

      const user = new UserData(id, setList, setList);
      sessionStorage.setItem("userId",id);
      sessionStorage.setItem(id,JSON.stringify(user));
      return of(user);
    }
  }

  override saveUser(user: UserData): Observable<string> {
    // This is not fully implemented. I changed the abstract class to include this method,
    // so I needed placeholder things
    sessionStorage.setItem(user.uid,JSON.stringify(user));
    return of("");
  }
}

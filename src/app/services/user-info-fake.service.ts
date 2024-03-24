import { Injectable } from '@angular/core';
import { AccessStorageData, UserData } from '../data-models/user-model';
import { of, Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoFakeService extends UserInfoService{
  // will always return user1 regardless of what is passed
  override loadUser(id: string): Observable<UserData> {
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
    return of(new UserData("user1", setList, setList));
  }

  override saveUser(user: UserData): Observable<string> {
    // This is not fully implemented. I changed the abstract class to include this method,
    // so I needed placeholder things
    return of("");
  }
}

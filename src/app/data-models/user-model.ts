import { Observable, Observer, of } from "rxjs";

export interface AccessStorageData {
  setId: string;
  viewed: string;
}

export interface AccessData {
  setId: string;
  viewed: Date;
}

export class UserData{
  readonly username: string;
  private _recentSets: Map<string, Date>;
  private _ownedSets: Map<string, Date>;

  constructor(
    username: string = "",
    recent: AccessStorageData[] = [],
    owned: AccessStorageData[] = []
  ) {
    this.username = username;
    this._recentSets = new Map(recent.map(obj => [obj.setId, new Date(obj.viewed)]));
    this._ownedSets = new Map(owned.map(obj => [obj.setId, new Date(obj.viewed)]));
  }

  /**
   * Updates the time last viewed of the user owned sets.
   */
  updateOwned({setId, viewed}: AccessData) {
    this._ownedSets.set(setId, new Date(viewed));
  }

  /**
   * Updates the list recently viewed sets.
   */
  updateRecentSets({setId, viewed}: AccessData) {
    this._recentSets.set(setId, new Date(viewed));
  }

  /**
   * Get a sorted list of recently viewed sets.
   */
  getRecentSets(): AccessData[] {
    return this.mapToList(this._recentSets);
  }

  /**
   * Get a sorted list of owned study sets.
   */
  getOwnedSets(): AccessData[] {
    return this.mapToList(this._ownedSets);
  }

  // turns the map into an array and then sorts
  private mapToList(setDateMap: Map<string, Date>) {
    let asList = Array.from(setDateMap, ([id, time]) => ({setId: id, time: time}));
    asList.sort((a, b) => (b.time.getTime() - a.time.getTime()));
    return asList.map(ele => ({setId: ele.setId, viewed: ele.time}));
  }
}

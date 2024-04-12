export interface AccessStorageData {
  setId: string;
  viewed: string;
}

export interface AccessData {
  setId: string;
  viewed: Date;
}

export interface UserModel {
  uid: string;
  ownedSets: AccessStorageData[];
  recentSets: AccessStorageData[];
}

export class UserData {
  readonly uid: string;
  private _recentSets: Map<string, Date>;
  private _ownedSets: Map<string, Date>;

  constructor(
    uid: string = "",
    recent: AccessStorageData[] = [],
    owned: AccessStorageData[] = []
  ) {
    this.uid = uid;
    this._recentSets = new Map(recent.map(obj => [obj.setId, new Date(obj.viewed)]));
    this._ownedSets = new Map(owned.map(obj => [obj.setId, new Date(obj.viewed)]));
  }

  /**
   * Updates the time last viewed of the user owned sets.
   */
  updateOwned({setId, viewed}: AccessData) {
    this._ownedSets.set(setId, viewed);
  }

  /**
   * Updates the list recently viewed sets.
   */
  updateRecentSets({setId, viewed}: AccessData) {
    this._recentSets.set(setId, viewed);
  }

  /**
   * Get a sorted list of recently viewed sets.
   */
  getRecentSets(): AccessData[] {
    return this.mapToList(this._recentSets);
  }

  /**
   * Get a list of recently viewed set to send to DB.
   */
  getRecentSetsToStore(): AccessStorageData[] {
    return this.mapDateToListStr(this._recentSets);
  }

  /**
   * Get a sorted list of owned study sets.
   */
  getOwnedSets(): AccessData[] {
    return this.mapToList(this._ownedSets);
  }

  /**
   * Get a list of owned study sets to send to DB.
   */
  getOwnedSetsToStore(): AccessStorageData[] {
    return this.mapDateToListStr(this._ownedSets);
  }

  // turns the map into an array and then sorts
  private mapToList(setDateMap: Map<string, Date>) {
    let asList = Array.from(setDateMap, ([id, time]) => ({setId: id, time: time}));
    asList.sort((a, b) => (b.time.getTime() - a.time.getTime()));
    return asList.map(ele => ({setId: ele.setId, viewed: ele.time}));
  }

  // turns the map into an array with [string, srting] values
  mapDateToListStr(setDateMap: Map<string, Date>) {
    return Array.from(setDateMap, ([id, time]) => ({setId: id, viewed: time.toISOString()}));
  }

  // Creates a UserData object off of the User Model
  static copyUser(oldUser: UserModel): UserData {
    let newUser = new UserData(
      oldUser.uid,
      oldUser.recentSets,
      oldUser.ownedSets,
    );
    return newUser;
  }

  // Sets up JSON.stringify to properly stringify maps
  toJSON() {
    return {
        uid: this.uid,
        _recentSets: this.getRecentSets(),
        _ownedSets: this.getOwnedSets()
    };
 }
}

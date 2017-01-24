import { User } from './../models/user';

export class UserService {
  public user:User;

  constructor() {
      this.user = new User(null, null, null, null, null, null, null, null, null, null, null);
  }

  getUser() {
    return this.user;
  }

  setUser(usr:User) {
    this.user = usr;
  }
}
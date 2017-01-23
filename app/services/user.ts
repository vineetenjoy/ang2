import { User } from './../models/user';

export class UserService {
  public user:User;

  getUser() {
    if(this.user == null)
        this.user = new User(null, null, null, null, null, null, null, null, null);

    return  this.user;
  }

  setUser(usr:User) {
    this.user = usr;
  }
}
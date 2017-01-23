import { User } from './../models/user';

export class SignUpService {
  isUNameAvailable(uname:string) {
    return true;
  }

  createUser(user:User) {
    return { isSuccess: true, uerId: 'abcd' };
  }

  validateUser(userId:string, oTP:string) {
      return { isSuccess: true, errMsg: '' };
  }
}
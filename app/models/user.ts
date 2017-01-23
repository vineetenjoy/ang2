export class User {
  constructor(
    public id: string,
    public name: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public confirmPassword: string,
    public email: string,
    public phone: string,
    public imgUrl: string) { }
}
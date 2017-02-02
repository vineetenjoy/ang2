export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public address: string,
    public powaiFestRegister: boolean,
    public bollywoodRegister: boolean,
    public numSeats: number,
    public numSeatsRequested: number) { }
}
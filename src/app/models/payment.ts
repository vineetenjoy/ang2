export class Payment {
  constructor(
    public id: string,
    public amount: number,
    public merchantName: string,
    public cardNumber: string,
    public mode: string) { }
}
export class Merchant {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public location: string,
    public paymentModes: string,
    public imgUrl: string,
    public rating: number) { }
}
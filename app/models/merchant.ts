export class Merchant {
  constructor(
    public merchantId: string,
    public merchantCode: string,
    public displayName: string,
    public category: string,
    public locality: string,
    public paymentModes: string,
    public imgsrc: string,
    public averageRating: number) { }
}
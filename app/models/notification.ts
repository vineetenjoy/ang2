export class Notification {
  constructor(
    public id: string,
    public text: string,
    public url: string,
    public pushedOn: Date) { }
}
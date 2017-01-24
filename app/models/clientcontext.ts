export class ClientContext {
  constructor(
    public title: string,
    public showBack: boolean,
    public backRoute: string,
    public nextRoute: string,
    public actionTitle: string,
    public showActionBar: boolean) { }
}
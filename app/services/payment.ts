//This file is temporary and will be deleted.
export class PaymentService {
  private _amount: number;
  private _merchant: string;
  private _backURL: string;

  getPaymentDetails() {
    return {amount: this._amount, merchant: this._merchant, backURL: this._backURL};
  }

  setPaymentDetails(amt: number, mcht: string, bURL: string) {
    this._amount = amt;
    this._merchant = mcht;
    this._backURL = bURL;
  }
}
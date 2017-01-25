import { Merchant } from './../models/merchant';

export class MerchantsService {
  private _merchants: Merchant[];  

  constructor() {
      this._merchants = [new Merchant("1", "Mastek Foundation", "Not Categorized", "Mahape", "PayU", "", 4.96),
        new Merchant("2", "Seepz Canteen", "Food & Beverages", "Seepz", "PayU", "", 4.33),
        new Merchant("3", "Monu Fruits and vegetables", "Fruits & Vegetables", "Old Market", "PayU", "", 4.99),
        new Merchant("4", "Anand glass", "Glass & Ceramics", "S V Road Borivali", "PayU", "", 4.25),
        new Merchant("5", "Bablu fruits and vegetables", "Fruits & Vegetables", "Powai", "PayU", "", 4.99)];
  }  

  getMerchants():Merchant[] {
    return this._merchants;
  }

  getMerchant(id:string):Merchant {
    return this._merchants.find(m => m.id == id);
  }
}
import {StockDetailsModel} from "./stock-details.model";
import {BoutiqueModel} from "./boutique.model";

export interface StockModel {
  _id?: string;
  idBoutique?: string;
  idTypeMvtStock?: string;
  designation?: string;
  date?: Date;
  status?: number;
}

export interface StockCPLModel extends StockModel {
  filles?: StockDetailsModel[];
}

export class Stock {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 11:
        return 'badge-success';
      case 1:
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

  static getStatusLabel(status: number | undefined):string {
    switch (status) {
      case 11:
        return 'VALIDEE';
      case 1:
        return 'EN ATTENTE';
      default:
        return "FERMER";
    }
  }
}

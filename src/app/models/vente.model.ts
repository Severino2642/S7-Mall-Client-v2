import {VenteDetailsModel} from "./vente-details.model";
import {ClientModel} from "./client.model";

export interface VenteModel {
  _id?: string;
  idBoutique?: string;
  idClient?: string;
  designation?: string;
  date?: Date;
  status?: number;
}

export interface VenteCPLModel extends VenteModel {
  montantTotal?:number;
  quantiteTotal?:number;
  client?: ClientModel;
  filles?: VenteDetailsModel[];
}

export class Vente {
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

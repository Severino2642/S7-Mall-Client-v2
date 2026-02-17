import {CaisseModel} from "./caisse.model";

export interface MouvementCaisseModel {
  _id?: string;
  idCaisse?: string;
  idSource?: string;
  designation?: string;
  debit?: number;
  credit?: number;
  status?: number;
  date?: Date;
}

export interface MouvementCaisseCPLModel extends MouvementCaisseModel {
  caisse?:CaisseModel;
}

export class MouvementCaisse {
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

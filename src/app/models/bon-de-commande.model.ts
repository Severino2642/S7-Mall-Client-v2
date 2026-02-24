import {BonDeCommandeDetailsModel} from "./bon-de-commande-details.model";
import {BoutiqueModel} from "./boutique.model";
import {ClientModel} from "./client.model";

export interface BonDeCommandeModel {
  _id?: string;
  idClient?: string;
  idCommande?: string;
  idBoutique?: string;
  designation?: string;
  date?: Date;
  status?: number;
}

export interface BonDeCommandeCPLModel extends BonDeCommandeModel{
  montantTotal?: number;
  quantiteTotal?: number;
  filles?: BonDeCommandeDetailsModel[];
  boutique?: BoutiqueModel;
  client?: ClientModel;
}

export class BonDeCommande {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 11:
        return 'badge-success';
      case 1:
        return 'badge-warning';
      case 31:
        return 'badge-danger';
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
      case 31:
        return 'REJETEE';
      default:
        return "FERMER";
    }
  }
}

import {CentreCommercialModel} from "./mall.model";
import {BoutiqueModel} from "./boutique.model";
import {LocationBoxeModel} from "./location-boxe.model";
import {ProprietaireModel} from "./proprietaire.model";
import {BoxeModel} from "./boxe.model";

export interface PaymentLoyerModel {
  _id?: string;
  idCentreCommercial?: string;
  idBoutique?: string;
  mois?: string;
  annee?: number;
  montant?: number;
  status?: number;
  date?: Date;
}

export interface PaymentLoyerCPLModel extends PaymentLoyerModel {
  centreCommercial?: CentreCommercialModel;
  boutique?:BoutiqueModel;
  location?:LocationBoxeModel;
  proprietaire?: ProprietaireModel;
  boxe?:BoxeModel;
}

export class PaymentLoyer {
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

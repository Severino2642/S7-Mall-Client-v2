import {ProprietaireModel} from "./proprietaire.model";
import {BoxeModel} from "./boxe.model";
import {CentreCommercialModel} from "./mall.model";
import {BoutiqueModel} from "./boutique.model";

export interface LocationBoxeModel {
  _id ?:string;
  idBoxe ?:string;
  idProprietaire ?:string;
  idBoutique ?:string;
  loyer ?:number;
  echeance_payment ?:Number;
  date_expiration ?:Date;
  status ?:number;
  date ?:Date;
}

export interface LocationBoxeCPLModel extends LocationBoxeModel{
  proprietaire?:ProprietaireModel;
  boxe?:BoxeModel;
  centreCommercial?:CentreCommercialModel;
  boutique?:BoutiqueModel;
}

export class LocationBoxe {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 1:
        return 'badge-success';
      case 3:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  static getStatusLabel(status: number | undefined):string {
    switch (status) {
      case 1:
        return 'DISPONIBLE';
      case 3:
        return 'BLOQUER';
      default:
        return "FERMER";
    }
  }
}

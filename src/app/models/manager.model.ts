import {BoutiqueModel} from "./boutique.model";
import {AuthentificationModel} from "./authentification.model";
import {CentreCommercialModel} from "./mall.model";

export interface ManagerModel {
  _id?: string;
  idBoutique?: string;
  nom?: string;
  prenom?: string;
  contact?: string;
  email?: string;
  status?: number;
  date?: Date;
}

export interface ManagerCPLModel extends ManagerModel {
  boutique?:BoutiqueModel;
  centreCommercial?:CentreCommercialModel;
  authentification?:AuthentificationModel;
}

export class Manager {
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

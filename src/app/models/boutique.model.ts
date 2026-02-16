import {ProprietaireModel} from "./proprietaire.model";
import {BoxeModel} from "./boxe.model";
import {CentreCommercialModel} from "./mall.model";

export interface BoutiqueModel {
  _id?: string;
  idDemandeLocation: string;
  idBoxe: string;
  idProprietaire: string;
  nom?: string;
  description?: string;
  heure_ouverture: string;
  heure_fermeture: string;
  contact?: string;
  email?: string;
  status?: number;
  date?: Date;
}

export interface BoutiqueCPLModel extends BoutiqueModel{
  proprietaire?: ProprietaireModel;
  boxe?: BoxeModel;
  centreCommercial?: CentreCommercialModel;
}

export class Boutique {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 1:
        return 'badge-success';
      case 2:
        return 'badge-danger';
      case 3:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  static getStatusLabel(status: number | undefined):string {
    switch (status) {
      case 1:
        return 'OUVERT';
      case 3:
        return 'FERMER';
      case 31:
        return 'INDISPONIBLE';
      default:
        return "FERMER";
    }
  }
}

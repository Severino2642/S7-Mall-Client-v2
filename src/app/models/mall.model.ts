import {FileModel} from "./file.model";
import {FollowerModel} from "./follower.model";

export interface CentreCommercialModel {
  _id?: string,
  nom?: string,
  adresse?: string,
  isOuvert?: boolean,
  heure_ouverture?: string,
  heure_fermeture?: string,
  date_creation?: Date
}

export interface CentreCommercialCPLModel extends CentreCommercialModel{
  pdp?: FileModel,
  pdc?: FileModel,
  followers?: FollowerModel[],
}

export class CentreCommercial {
  static getStatusClass(status: boolean | undefined): string {
    switch (status) {
      case true:
        return 'badge-success';
      case false:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  static getStatusLabel(status: boolean | undefined):string {
    switch (status) {
      case true:
        return 'OUVERT';
      case false:
        return 'FERMER';
      default:
        return "FERMER";
    }
  }
}

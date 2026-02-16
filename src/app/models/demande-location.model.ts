import {OffreDeLocationModel} from "./offre_location.model";
import {BoxeModel} from "./boxe.model";
import {ProprietaireModel} from "./proprietaire.model";

export interface DemandeLocationModel {
  _id?: string;
  idOffreLocation?: string;
  idProprietaire?: string;
  montantLoyer?: number;
  date?: Date;
  status?: number;
}

export interface DemandeLocationCPLModel extends DemandeLocationModel {
  offre?: OffreDeLocationModel;
  boxe?: BoxeModel;
  proprietaire?: ProprietaireModel;
}

export class DemandeLocation {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 11:
        return 'badge-success';
      case 2:
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
        return 'ACCEPTER';
      case 2:
        return 'EN ATTENTE';
      case 31:
        return 'REJETER';
      default:
        return "EN ATTENTE";
    }
  }
}

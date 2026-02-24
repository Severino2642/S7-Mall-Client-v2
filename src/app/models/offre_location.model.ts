import {FileModel} from "./file.model";

export interface OffreDeLocationModel {
  _id?: string;
  idBoxe?:string;
  description?:string;
  montantLoyer?: number;
  status?: number;
  date?:Date;
}

export interface OffreDeLocationCPLModel {
  _id?: string;
  idBoxe?:string;
  description?:string;
  montantLoyer?: number;
  status?: number;
  date?:Date;
  nomBoxe?: string;
  longueurBoxe?: number,
  largeurBoxe?: number,
  idCentreCommercial?: string,
  nomCentreCommercial?: string,
  photoBoxe?: FileModel;
  autrePhoto?:FileModel[];
}

export class OffreDeLocation {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 11:
        return 'badge-success';
      case 2:
        return 'badge-warning';
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
      case 2:
        return 'EN ATTENTE';
      case 3:
        return 'OCCUPÉE';
      default:
        return "DISPONIBLE";
    }
  }
}

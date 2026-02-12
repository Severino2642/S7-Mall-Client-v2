export interface BoxeModel {
  _id?: string;
  idCentreCommercial?:string;
  nom?: string;
  description?:string;
  status?: number;
  longueur?:number;
  largeur?:number;
}

export class Boxe {
  static getStatusClass(status: number | undefined): string {
    switch (status) {
      case 1:
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
        return 'OCCUPEE';
      default:
        return "DISPONIBLE";
    }
  }
}

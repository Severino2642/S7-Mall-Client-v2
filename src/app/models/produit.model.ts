import {CategorieModel} from "./categorie.model";
import {ProduitVarianteModel} from "./produit-variante.model";
import {FileModel} from "./file.model";

export interface ProduitModel {
  _id?: string;
  idBoutique?: string;
  idCategorie?: string;
  nom?: string;
  description?: string;
  prix?: number;
  quantite?: number;
  status?:number;
}

export interface ProduitCPLModel extends ProduitModel {
  categorie?: CategorieModel;
  variantes?: ProduitVarianteModel[];
  photo?:FileModel;
  autrePhoto?:FileModel[];
}

export class Produit {
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
        return 'INDISPONIBLE';
      default:
        return "FERMER";
    }
  }
}

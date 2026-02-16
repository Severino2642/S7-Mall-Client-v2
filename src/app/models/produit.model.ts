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
}

export interface ProduitCPLModel extends ProduitModel {
  categorie?: CategorieModel;
  variantes?: ProduitVarianteModel[];
  photo?:FileModel;
  autrePhoto?:FileModel[];
}

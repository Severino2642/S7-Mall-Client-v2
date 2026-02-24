import {ProduitModel} from "./produit.model";

export interface CommandeDetailsModel {
  _id?: string;
  idMere?: string;
  idProduit?: string;
  quantite?: number;
  prixUnitaire?: number;
}

export interface CommandeDetailsCPLModel extends CommandeDetailsModel{
  produit?: ProduitModel
}

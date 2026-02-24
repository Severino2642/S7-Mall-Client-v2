import {ProduitModel} from "./produit.model";

export interface BonDeCommandeDetailsModel {
  _id?: string;
  idMere?: string;
  idProduit?: string;
  quantite?: number;
  prixUnitaire?: number;
}

export interface BonDeCommandeDetailsCPLModel extends BonDeCommandeDetailsModel{
  produit?: ProduitModel
}

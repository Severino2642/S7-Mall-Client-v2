import {ProduitModel} from "./produit.model";

export interface VenteDetailsModel {
  _id?: string;
  idMere?: string;
  idProduit?: string;
  quantite?: number;
  prixUnitaire?: number;
  remarque?: string;
  remise?: number;
}

export interface VenteDetailsCPLModel extends VenteDetailsModel{
  montantTotal?: number;
  produit?: ProduitModel;
}

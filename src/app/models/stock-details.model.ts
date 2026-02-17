import {ProduitModel} from "./produit.model";

export interface StockDetailsModel {
  _id?: string;
  idMere?: string;
  idProduit?: string;
  entree?: number;
  sortie?: number;
  remarque?: string;
}

export interface StockDetailsCPLModel extends StockDetailsModel {
  produit?: ProduitModel;
}

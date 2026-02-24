import {ProduitCPLModel, ProduitModel} from "./produit.model";
import {BoutiqueModel} from "./boutique.model";

export interface PanierModel {
  _id?: string;
  idClient?: string;
  idProduit?: string;
  quantite?: number;
  remarque?: string;
  date?: Date;
}

export interface PanierCPLModel extends PanierModel{
  produit?:ProduitCPLModel,
  boutique?:BoutiqueModel
}

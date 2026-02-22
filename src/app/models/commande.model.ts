import {CommandeDetailsModel} from "./commande-details.model";

export interface CommandeModel {
  _id?: string;
  idClient?: string;
  designation?: string;
  status?: number;
  date?: Date;
}

export interface CommandeCPLModel extends CommandeModel{
  montantTotal?: number;
  quantiteTotal?: number;
  filles?: CommandeDetailsModel[]
}

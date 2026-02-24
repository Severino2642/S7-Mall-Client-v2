export interface FileModel {
  _id?: string;
  nom?: string;
  url?: string;
  idType?: string;
  idProprietaire?: string;
  date?: Date;
}

export interface FileModelCPL extends FileModel{
  fileType?:{
    val?:string;
    desce?:string;
  }
}

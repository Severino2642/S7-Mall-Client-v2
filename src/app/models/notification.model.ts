export interface NotificationModel {
  _id?: string;
  idUser: string;
  title?: string;
  message: string;
  lien?: string;
  badge?: string;
  lu?: boolean;
  date?: Date;
}

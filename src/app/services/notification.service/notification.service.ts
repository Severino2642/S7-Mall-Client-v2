import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {MouvementCaisseModel} from "../../models/mouvement-caisse.model";
import {NotificationModel} from "../../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${UrlUtil.apiUrl}/api/notification`;

  constructor(private http: HttpClient) { }

  async create(data: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.post(this.apiUrl, data));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async update(id:any,data: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.put(`${this.apiUrl}/${id}`, data));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async delete(id:any): Promise<any|null> {
    try {
      const res = await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getById(id: string): Promise<NotificationModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<NotificationModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdUser(id: string): Promise<NotificationModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<NotificationModel[]>(`${this.apiUrl}/user/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async toutmarquerCommeLu(idUser: string): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/user/marquerLu/${idUser}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async marquerCommeLu(id: string): Promise<NotificationModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<NotificationModel>(`${this.apiUrl}/marquerLu/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

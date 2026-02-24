import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {NotificationModel} from "../../models/notification.model";
import {ManagerCPLModel, ManagerModel} from "../../models/manager.model";
import {BoutiqueModel} from "../../models/boutique.model";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = `${UrlUtil.apiUrl}/api/manager`;

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

  async getById(id: string): Promise<ManagerModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<ManagerModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<ManagerCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<ManagerCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdProprietaire(id: string): Promise<ManagerCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<ManagerCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdBoutique(id: string): Promise<ManagerCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<ManagerCPLModel[]>(`${this.apiUrl}/boutique/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async changerStatus(id: string,status:any): Promise<BoutiqueModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel>(`${this.apiUrl}/changerStatus/${id}?status=${status}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

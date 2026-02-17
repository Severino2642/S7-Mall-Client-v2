import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {ProprietaireModel} from "../../models/proprietaire.model";
import {ClientModel} from "../../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${UrlUtil.apiUrl}/api/client`;

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

  delete(id:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  async getById(id: string): Promise<ClientModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<ClientModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdBoutique(id: string): Promise<ClientModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<ClientModel[]>(`${this.apiUrl}/boutique/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

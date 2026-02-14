import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {FileModelCPL} from "../../models/file.model";
import {BoxeModel} from "../../models/boxe.model";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${UrlUtil.apiUrl}/api/file`;

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

  async createMultiple(data: any[]): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.post(`${this.apiUrl}/insertFilleMultiple`, data));
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

  async getById(id: string): Promise<FileModelCPL | null> {
    try {
      const res = await firstValueFrom(this.http.get<FileModelCPL>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByProprietaireAndType(idProprietaire: string,type:string|null): Promise<BoxeModel[] | null> {
    try {
      let url = `${this.apiUrl}/proprietaire/${idProprietaire}`;
      if (type){
        url += `?${type}`;
      }
      const res = await firstValueFrom(this.http.get<BoxeModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

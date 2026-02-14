import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {BoxeModel} from "../../models/boxe.model";
import {OffreDeLocationCPLModel, OffreDeLocationModel} from "../../models/offre_location.model";

@Injectable({
  providedIn: 'root'
})
export class OffreLocationServiceService {
  private apiUrl = `${UrlUtil.apiUrl}/api/offre`;

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

  async getById(id: string): Promise<OffreDeLocationModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<OffreDeLocationModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<OffreDeLocationCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<OffreDeLocationCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdCentreCommercial(id: string): Promise<OffreDeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<OffreDeLocationCPLModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdBoxe(id: string): Promise<OffreDeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<OffreDeLocationCPLModel[]>(`${this.apiUrl}/boxe/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getOffreDisponible(): Promise<OffreDeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<OffreDeLocationCPLModel[]>(`${this.apiUrl}/status/disponible`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {UrlUtil} from '../../utils/url.util';
import {CentreCommercialCPLModel, CentreCommercialModel} from '../../models/mall.model';
import {BoutiqueModel} from "../../models/boutique.model";

@Injectable({
  providedIn: 'root',
})
export class MallService {
  private apiUrl = `${UrlUtil.apiUrl}/api/centre`;

  constructor(private http: HttpClient) {}

  async createCentre(data: any): Promise<any | null> {
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

  // Récupération par ID
  async getById(id: string): Promise<CentreCommercialModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<CentreCommercialModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<CentreCommercialCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<CentreCommercialCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAll(): Promise<CentreCommercialModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<CentreCommercialModel[]>(`${this.apiUrl}/`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async ouvrir(id: string): Promise<CentreCommercialModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<CentreCommercialModel>(`${this.apiUrl}/ouvrir/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async fermer(id: string): Promise<CentreCommercialModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<CentreCommercialModel>(`${this.apiUrl}/fermer/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

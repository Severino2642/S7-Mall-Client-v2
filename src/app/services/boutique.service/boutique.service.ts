import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {DemandeLocationCPLModel, DemandeLocationModel} from "../../models/demande-location.model";
import {BoutiqueCPLModel, BoutiqueModel} from "../../models/boutique.model";
import {CentreCommercialModel} from "../../models/mall.model";

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private apiUrl = `${UrlUtil.apiUrl}/api/boutique`;

  constructor(private http:HttpClient) { }

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

  async getById(id: string): Promise<BoutiqueModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAll(): Promise<BoutiqueModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel[]>(`${this.apiUrl}/`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<BoutiqueCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdCentreCommercial(id: string): Promise<BoutiqueCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueCPLModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdProprietaire(id: string): Promise<BoutiqueCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async ouvrir(id: string): Promise<BoutiqueModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel>(`${this.apiUrl}/ouvrir/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async fermer(id: string): Promise<BoutiqueModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel>(`${this.apiUrl}/fermer/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

}

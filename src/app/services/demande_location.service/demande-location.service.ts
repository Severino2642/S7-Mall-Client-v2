import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {OffreDeLocationCPLModel, OffreDeLocationModel} from "../../models/offre_location.model";
import {DemandeLocationCPLModel, DemandeLocationModel} from "../../models/demande-location.model";

@Injectable({
  providedIn: 'root'
})
export class DemandeLocationService {
  private apiUrl = `${UrlUtil.apiUrl}/api/demande`;

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

  async getById(id: string): Promise<DemandeLocationModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<DemandeLocationCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdCentreCommercial(id: string): Promise<DemandeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationCPLModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdProprietaire(id: string): Promise<DemandeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdOffre(id: string): Promise<DemandeLocationCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationCPLModel[]>(`${this.apiUrl}/offre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async accepter(id: string): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/accepter/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async rejeter(id: string): Promise<DemandeLocationModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<DemandeLocationModel>(`${this.apiUrl}/rejeter/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

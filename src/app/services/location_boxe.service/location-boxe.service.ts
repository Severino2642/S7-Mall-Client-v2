import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {NotificationModel} from "../../models/notification.model";
import {LocationBoxeCPLModel, LocationBoxeModel} from "../../models/location-boxe.model";

@Injectable({
  providedIn: 'root'
})
export class LocationBoxeService {
  private apiUrl = `${UrlUtil.apiUrl}/api/location_boxe`;

  constructor(private http: HttpClient) {
  }

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

  async update(id: any, data: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.put(`${this.apiUrl}/${id}`, data));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async delete(id: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<LocationBoxeCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdProprietaire(id: string): Promise<LocationBoxeCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getDisponibleCPLByIdProprietaire(id: string): Promise<LocationBoxeCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeCPLModel[]>(`${this.apiUrl}/proprietaire/disponible/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdCentreCommercial(id: string): Promise<LocationBoxeCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeCPLModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdBoxe(id: string): Promise<LocationBoxeCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeCPLModel[]>(`${this.apiUrl}/boxe/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async bloquer(id: string): Promise<LocationBoxeModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeModel>(`${this.apiUrl}/bloquer/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async debloquer(id: string): Promise<LocationBoxeModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<LocationBoxeModel>(`${this.apiUrl}/debloquer/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

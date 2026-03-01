import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {BoxeModel} from '../../models/boxe.model';
import {UrlUtil} from '../../utils/url.util';

@Injectable({
  providedIn: 'root',
})

export class BoxeService {
  private apiUrl = `${UrlUtil.apiUrl}/api/boxe`;

  constructor(private http: HttpClient) {}

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

  async getById(id: string): Promise<BoxeModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoxeModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  // Récupération de toutes les boxe d'un centre commercial
  async getByIdCentreCommercial(id: string): Promise<BoxeModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoxeModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

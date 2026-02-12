import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {UrlUtil} from '../../utils/url.util';
import {CentreCommercialModel} from '../../models/mall.model';

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
}

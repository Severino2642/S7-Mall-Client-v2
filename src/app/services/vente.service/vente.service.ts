import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {StockCPLModel, StockModel} from "../../models/stock.model";
import {StockDetailsCPLModel} from "../../models/stock-details.model";
import {VenteCPLModel, VenteModel} from "../../models/vente.model";
import {VenteDetailsCPLModel} from "../../models/vente-details.model";

@Injectable({
  providedIn: 'root'
})
export class VenteService {
  private apiUrl = `${UrlUtil.apiUrl}/api/vente`;

  constructor(private http: HttpClient) { }

  async createMereFille(data: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.post(`${this.apiUrl}/insertMereFille`, data));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async updateMereFille(id:any,data: any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.put(`${this.apiUrl}/updateMereFille/${id}`, data));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async deleteMereFille(id:any): Promise<any | null> {
    try {
      const res = await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<VenteCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<VenteCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdBoutique(id: string): Promise<VenteCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/boutique/${id}`;
      const res = await firstValueFrom(this.http.get<VenteCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async valider(id: string): Promise<VenteModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<VenteModel>(`${this.apiUrl}/valider/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getFillesByIdMere(id: string): Promise<VenteDetailsCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/filles/${id}`;
      const res = await firstValueFrom(this.http.get<VenteDetailsCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

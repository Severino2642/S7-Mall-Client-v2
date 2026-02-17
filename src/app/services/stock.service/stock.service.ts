import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ProduitCPLModel} from "../../models/produit.model";
import {StockCPLModel, StockModel} from "../../models/stock.model";
import {BoutiqueModel} from "../../models/boutique.model";
import {StockDetailsCPLModel} from "../../models/stock-details.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = `${UrlUtil.apiUrl}/api/stock`;

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

  async getCPLById(id: string): Promise<StockCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<StockCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdBoutique(id: string): Promise<StockCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/boutique/${id}`;
      const res = await firstValueFrom(this.http.get<StockCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async valider(id: string): Promise<StockModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<StockModel>(`${this.apiUrl}/valider/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getStockDetailsByIdMere(id: string): Promise<StockDetailsCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/filles/${id}`;
      const res = await firstValueFrom(this.http.get<StockDetailsCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdSource(id: string): Promise<StockCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/source/${id}`;
      const res = await firstValueFrom(this.http.get<StockCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

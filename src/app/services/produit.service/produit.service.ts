import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {OffreDeLocationCPLModel} from "../../models/offre_location.model";
import {ProduitCPLModel, ProduitModel} from "../../models/produit.model";
import {BoutiqueModel} from "../../models/boutique.model";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `${UrlUtil.apiUrl}/api/produit`;

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

  async getAll(): Promise<ProduitModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<ProduitModel[]>(`${this.apiUrl}/`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAllByIdBoutique(id:string,status:any): Promise<ProduitModel[] | null> {
    try {
      let url = `${this.apiUrl}/schema/boutique/${id}`;
      if(status){
        url += `?status=${status}`;
      }
      const res = await firstValueFrom(this.http.get<ProduitModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<ProduitCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<ProduitCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdBoutique(id: string,status:any): Promise<ProduitCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/boutique/${id}`;
      if(status){
        url += `?status=${status}`;
      }
      const res = await firstValueFrom(this.http.get<ProduitCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdCentreCommercial(id: string,status:any): Promise<ProduitCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/centre/${id}`;
      if(status){
        url += `?status=${status}`;
      }
      const res = await firstValueFrom(this.http.get<ProduitCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async changerStatus(id: string,status:any): Promise<BoutiqueModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BoutiqueModel>(`${this.apiUrl}/changerStatus/${id}?status=${status}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAllForClient(): Promise<ProduitCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/client`;
      const res = await firstValueFrom(this.http.get<ProduitCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdForClient(id: string): Promise<ProduitCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<ProduitCPLModel>(`${this.apiUrl}/client/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

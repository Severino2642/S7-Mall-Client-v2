import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ManagerCPLModel} from "../../models/manager.model";
import {PaymentLoyerCPLModel, PaymentLoyerModel} from "../../models/payment-loyer.model";
import {BonDeCommandeModel} from "../../models/bon-de-commande.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentLoyerService {
  private apiUrl = `${UrlUtil.apiUrl}/api/payment_loyer`;

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

  async getById(id: string): Promise<PaymentLoyerModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<PaymentLoyerCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdProprietaire(id: string): Promise<PaymentLoyerCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdBoutique(id: string): Promise<PaymentLoyerCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerCPLModel[]>(`${this.apiUrl}/boutique/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getByIdCentreCommercial(id: string): Promise<PaymentLoyerCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerCPLModel[]>(`${this.apiUrl}/centre/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async valider(id: string): Promise<PaymentLoyerModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerModel>(`${this.apiUrl}/valider/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async rejeter(id: string): Promise<PaymentLoyerModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<PaymentLoyerModel>(`${this.apiUrl}/rejeter/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

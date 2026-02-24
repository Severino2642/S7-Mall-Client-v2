import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {BonDeCommandeCPLModel, BonDeCommandeModel} from "../../models/bon-de-commande.model";
import {BonDeCommandeDetailsCPLModel} from "../../models/bon-de-commande-details.model";

@Injectable({
  providedIn: 'root'
})
export class BonDeCommandeService {
  private apiUrl = `${UrlUtil.apiUrl}/api/bon_de_commande`;

  constructor(private http: HttpClient) { }

  async getCPLById(id: string): Promise<BonDeCommandeCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BonDeCommandeCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdBoutique(id: string): Promise<BonDeCommandeCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/boutique/${id}`;
      const res = await firstValueFrom(this.http.get<BonDeCommandeCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdCommande(id: string): Promise<BonDeCommandeCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/commande/${id}`;
      const res = await firstValueFrom(this.http.get<BonDeCommandeCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getFillesByIdMere(id: string): Promise<BonDeCommandeDetailsCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/filles/${id}`;
      const res = await firstValueFrom(this.http.get<BonDeCommandeDetailsCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async valider(id: string): Promise<BonDeCommandeModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BonDeCommandeModel>(`${this.apiUrl}/valider/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async rejeter(id: string): Promise<BonDeCommandeModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<BonDeCommandeModel>(`${this.apiUrl}/rejeter/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

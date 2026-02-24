import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {CaisseModel} from "../../models/caisse.model";
import {MouvementCaisseCPLModel, MouvementCaisseModel} from "../../models/mouvement-caisse.model";

@Injectable({
  providedIn: 'root'
})
export class MouvementCaisseService {
  private apiUrl = `${UrlUtil.apiUrl}/api/mouvement_caisse`;

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

  async getById(id: string): Promise<MouvementCaisseModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseModel>(`${this.apiUrl}/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLById(id: string): Promise<MouvementCaisseCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAllCPLByIdProprietaire(id: string): Promise<MouvementCaisseCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseCPLModel[]>(`${this.apiUrl}/proprietaire/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getAllByIdCaisse(id: string): Promise<MouvementCaisseModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseModel[]>(`${this.apiUrl}/caisse/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async valider(id: string): Promise<MouvementCaisseModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseModel[]>(`${this.apiUrl}/valider/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdSource(id: string): Promise<MouvementCaisseCPLModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<MouvementCaisseCPLModel[]>(`${this.apiUrl}/source/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

}

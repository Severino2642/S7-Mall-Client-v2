import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {StockCPLModel} from "../../models/stock.model";
import {firstValueFrom} from "rxjs";
import {CommandeCPLModel} from "../../models/commande.model";
import {StockDetailsCPLModel} from "../../models/stock-details.model";
import {CommandeDetailsCPLModel} from "../../models/commande-details.model";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = `${UrlUtil.apiUrl}/api/commande`;

  constructor(private http: HttpClient) { }

  async getCPLById(id: string): Promise<CommandeCPLModel | null> {
    try {
      const res = await firstValueFrom(this.http.get<CommandeCPLModel>(`${this.apiUrl}/details/${id}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getCPLByIdClient(id: string): Promise<CommandeCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/client/${id}`;
      const res = await firstValueFrom(this.http.get<CommandeCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }

  async getFillesByIdMere(id: string): Promise<CommandeDetailsCPLModel[] | null> {
    try {
      let url = `${this.apiUrl}/filles/${id}`;
      const res = await firstValueFrom(this.http.get<CommandeDetailsCPLModel[]>(url));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

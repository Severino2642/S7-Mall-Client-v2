import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {FileTypeModel} from "../../models/file-type.model";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = `${UrlUtil.apiUrl}/api/categorie`;

  constructor(private http:HttpClient) { }

  async getAll(): Promise<FileTypeModel[] | null> {
    try {
      const res = await firstValueFrom(this.http.get<FileTypeModel[]>(`${this.apiUrl}/`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

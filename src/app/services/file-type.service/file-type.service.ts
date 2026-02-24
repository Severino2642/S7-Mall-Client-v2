import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {OffreDeLocationCPLModel} from "../../models/offre_location.model";
import {firstValueFrom} from "rxjs";
import {FileTypeModel} from "../../models/file-type.model";

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  private apiUrl = `${UrlUtil.apiUrl}/api/filetype`;

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

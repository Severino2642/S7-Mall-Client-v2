import { Injectable } from '@angular/core';
import {UrlUtil} from "../../utils/url.util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  private apiUrl = `${UrlUtil.apiUrl}/api/follower`;

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

  async deleteFollowRelation(idUser:any,idFollower:any): Promise<any|null> {
    try {
      const res = await firstValueFrom(this.http.delete(`${this.apiUrl}/follow-relation/${idUser}/${idFollower}`));
      return res;
    } catch (err: any) {
      console.error(err);
      alert(err.error?.message || 'Erreur serveur');
      return null;
    }
  }
}

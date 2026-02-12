import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlUtil} from '../../utils/url.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${UrlUtil.apiUrl}/api/authentification`;

  constructor(private http: HttpClient) {}

  login(data: any){
    return this.http.post(this.apiUrl+"/login", data);
  }
}

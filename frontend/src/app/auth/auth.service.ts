import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from './login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'//este servicio se usa en toda la app sin nec.de importarlo manualmente en un módulo.
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(credentials:LoginDto):
  Observable<{access_token:string}>{
    return this.http.post<{access_token:string}>
    (`${this.apiUrl}/login`,credentials);
  }
}


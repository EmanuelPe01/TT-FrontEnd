import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { infoLogin, loginUsuario, registrarCliente, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  saveClient(cliente: registrarCliente){
    return this.http.post(url + 'registerClient', cliente);
  } 

  login(cliente: loginUsuario): Observable<infoLogin>{
    return this.http.post<infoLogin>(url + 'login', cliente);
  }

  setToken(token: string) {
    this.cookie.set("token", token);
  }
  getToken() {
    return this.cookie.get("token");
  }
}

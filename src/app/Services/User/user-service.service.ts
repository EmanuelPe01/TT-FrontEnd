import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { infoLogin, loginUsuario, registrarUsuario, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  saveClient(usuario: registrarUsuario){
    return this.http.post(url + 'createUser', usuario);
  } 

  login(usuario: loginUsuario): Observable<infoLogin>{
    return this.http.post<infoLogin>(url + 'login', usuario);
  }

  setToken(token: string) {
    this.cookie.set('token', token);
  }

  getToken() {
    return this.cookie.get('token');
  }

  deleteToken() {
    this.cookie.delete('token');
  }

  isAuthenticated(): boolean {
    //Consumir metodo para comprobar token en backend
    const token = this.cookie.get('token'); 
    if(token && token !== '')
      return true

    return false
  }

  logout(): Observable<any> { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post(url + 'logout', {}, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { infoLogin, informacionUsuario, loginUsuario, registrarUsuario, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  setToken(token: string) {
    this.cookie.set('token', token);
  }

  getToken() {
    return this.cookie.get('token');
  }

  deleteToken() {
    this.cookie.delete('token');
  }

  saveClient(usuario: registrarUsuario){
    return this.http.post(url + 'createUser', usuario);
  } 

  login(usuario: loginUsuario): Observable<infoLogin>{
    return this.http.post<infoLogin>(url + 'login', usuario);
  }
  
  logout(): Observable<any> { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post(url + 'logout', {}, { headers });
  }

  isAuthenticated(): Observable<infoLogin> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<infoLogin>(url + 'check-status', { headers });
  }

  sendEmail(email: any) {
    return this.http.post(url + 'sendEmailToRestorePassword', email);
  }

  validateRecoveryToken(token: string) {
    return this.http.get(url + 'validateRecoveryToken/' + token);
  }

  restorePassword(token: string, password: any) {
    return this.http.post(url + 'restorePassword/' + token, password);
  }
}

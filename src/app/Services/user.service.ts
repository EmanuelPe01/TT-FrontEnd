import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { DetailInscription, InfoBasicaUsuario, InfoLogin, InformacionUsuario, LoginUsuario, RegistrarUsuario, url } from 'src/app/Models';
import { Rol } from '../Models/ModelRol';


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

  saveClient(usuario: RegistrarUsuario){
    return this.http.post(url + 'createUser', usuario);
  } 

  login(usuario: LoginUsuario): Observable<InfoLogin>{
    return this.http.post<InfoLogin>(url + 'login', usuario);
  }
  
  logout(): Observable<any> { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post(url + 'logout', {}, { headers });
  }

  isAuthenticated(): Observable<InfoLogin> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<InfoLogin>(url + 'check-status', { headers });
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

  detailInscription(): Observable<DetailInscription> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<DetailInscription>(url + 'getDetailInscription', { headers });
  }

  getUserByRole(id_rol: number): Observable<InfoBasicaUsuario[]> {
    return this.http.get<InfoBasicaUsuario[]>(url + 'usersByRole/' + id_rol)
  }

  getAllUsers(): Observable<InformacionUsuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<InformacionUsuario[]>(url + 'allUsers', { headers })
  }

  getAllRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(url + 'allRoles')
  }

  deleteUser(idUser: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.delete(url + 'deleteUsuario/' + idUser, { headers });
  }
}

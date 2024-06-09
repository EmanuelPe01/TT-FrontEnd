import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleEjercicio, getDetalleEjercicio, tipoEjercicio, UnidadMedida, url } from '../Models';
import { Observable } from 'rxjs';
import { UserServiceService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(
    private http: HttpClient,
    private userService: UserServiceService
  ) { }

  createTipoEjercicio(tipoEjercicio: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'createTipoEjercicio', tipoEjercicio, {headers});
  }

  getAllTiposEjercicio(): Observable<tipoEjercicio[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<tipoEjercicio[]>(url + 'getAllTipoEjercicio', {headers});
  }

  editTipoEjercicio(idTipoEjercicio: number, tipoEjercicio: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'updateTypeTrining/' + idTipoEjercicio, tipoEjercicio, {headers});
  }

  deleteTipoEjercicio(idTipoEjercicio: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete(url + 'deleteTypeTrining/' + idTipoEjercicio, {headers});
  }

  createEjercicio(detalleEjercicio: detalleEjercicio) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'createEjercicio', detalleEjercicio, {headers});
  }

  getAllEjercicios(): Observable<getDetalleEjercicio[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<getDetalleEjercicio[]> (url + 'getAllEjercicios', {headers})
  }

  getInfoBasicEjercicios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<any[]> (url + 'getInfoBasicEjercicios', {headers})
  }
 
  editEjercicio(detalleEjercicio: detalleEjercicio, idEjercicio: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'updateEjercicio/' + idEjercicio, detalleEjercicio, {headers});
  }

  deleteEjercicio(idEjercicio: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete(url + 'deleteEjercicio/' + idEjercicio, {headers});
  }

  getUnidadesMedida(): Observable<UnidadMedida[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<UnidadMedida[]>(url + 'allUnidadesMedida', {headers});
  }

  createUnidadMedida(unidadMedida: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'createUnidadMedida', unidadMedida, {headers});
  }

  updateUnidadMedida(id_unidadMedida: number, unidadMedida: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'updateUnidadMedida/' + id_unidadMedida, unidadMedida, {headers});
  }

  deleteUnidadMedida(id_unidadMedida: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete(url + 'deleteUnidadMedida/' + id_unidadMedida, {headers})
  }
}

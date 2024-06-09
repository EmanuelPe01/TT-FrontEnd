import { Injectable } from '@angular/core';
import { DetalleRutina, ResultadoRutina, rutinaGenerada } from '../Models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from '../Models';
import { Observable } from 'rxjs';
import { UserServiceService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(
    private http: HttpClient,
    private userService: UserServiceService
  ) { }

  saveRutina(rutina: rutinaGenerada) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'createRutina', rutina, {headers})
  }

  consultRutina(datosBusqueda: any): Observable<DetalleRutina[]> {
    let params = new HttpParams();
    params = params.append('id_inscripcion', datosBusqueda.id_inscripcion);
    params = params.append('fecha_inicio', datosBusqueda.fecha_inicio);
    params = params.append('fecha_fin', datosBusqueda.fecha_fin);
    params = params.append('halterofilia', datosBusqueda.halterofilia);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });

    return this.http.get<DetalleRutina[]>(url + 'showRutinas', { params: params, headers: headers });
  }

  getRutina(idRutina: number): Observable<DetalleRutina> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<DetalleRutina>(url + 'getRutina/'+idRutina, {headers});
  }

  deleteRutina(idRutina: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete(url + 'deleteRutina/' + idRutina, {headers});
  }

  updateRutina(rutina: rutinaGenerada, id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'updateRutina/' + id, rutina, {headers})
  }

  getResultadoRutina(idRutina: number): Observable<ResultadoRutina> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<ResultadoRutina>(url + 'getResultRoutine/' + idRutina, {headers});
  }

  setResultados(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'saveResult', data, {headers})
  }

  updateResultadoRutina(data: any, idRutina: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'uptadeResultRoutine/' + idRutina, data, {headers})
  }
}

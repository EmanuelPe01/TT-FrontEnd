import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleEjercicio, getDetalleEjercicio, tipoEjercicio, url } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(
    private http: HttpClient
  ) { }

  createTipoEjercicio(tipoEjercicio: any) {
    return this.http.post(url + 'createTipoEjercicio', tipoEjercicio);
  }

  getAllTiposEjercicio(): Observable<tipoEjercicio[]> {
    return this.http.get<tipoEjercicio[]>(url + 'getAllTipoEjercicio');
  }

  editTipoEjercicio(idTipoEjercicio: number, tipoEjercicio: any) {
    return this.http.put(url + 'updateTypeTrining/' + idTipoEjercicio, tipoEjercicio);
  }

  deleteTipoEjercicio(idTipoEjercicio: number) {
    return this.http.delete(url + 'deleteTypeTrining/' + idTipoEjercicio);
  }

  createEjercicio(detalleEjercicio: detalleEjercicio) {
    return this.http.post(url + 'createEjercicio', detalleEjercicio);
  }

  getAllEjercicios(): Observable<getDetalleEjercicio[]> {
    return this.http.get<getDetalleEjercicio[]> (url + 'getAllEjercicios')
  }

  editEjercicio(detalleEjercicio: detalleEjercicio, idEjercicio: number) {
    return this.http.put(url + 'updateEjercicio/' + idEjercicio, detalleEjercicio);
  }

  deleteEjercicio(idEjercicio: number) {
    return this.http.delete(url + 'deleteEjercicio/' + idEjercicio);
  }
}

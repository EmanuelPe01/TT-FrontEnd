import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleEjercicio, getDetalleEjercicio, tipoEjercicio, UnidadMedida, url } from '../Models';
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

  getInfoBasicEjercicios(): Observable<any[]> {
    return this.http.get<any[]> (url + 'getInfoBasicEjercicios')
  }
 
  editEjercicio(detalleEjercicio: detalleEjercicio, idEjercicio: number) {
    return this.http.put(url + 'updateEjercicio/' + idEjercicio, detalleEjercicio);
  }

  deleteEjercicio(idEjercicio: number) {
    return this.http.delete(url + 'deleteEjercicio/' + idEjercicio);
  }

  getUnidadesMedida(): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(url + 'allUnidadesMedida');
  }

  createUnidadMedida(unidadMedida: any) {
    return this.http.post(url + 'createUnidadMedida', unidadMedida);
  }

  updateUnidadMedida(id_unidadMedida: number, unidadMedida: any) {
    return this.http.put(url + 'updateUnidadMedida/' + id_unidadMedida, unidadMedida);
  }

  deleteUnidadMedida(id_unidadMedida: number) {
    return this.http.delete(url + 'deleteUnidadMedida/' + id_unidadMedida)
  }
}

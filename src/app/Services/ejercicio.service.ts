import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tipoEjercicio, url } from '../Models';
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
}

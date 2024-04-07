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
}

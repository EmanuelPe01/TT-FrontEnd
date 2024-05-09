import { Injectable } from '@angular/core';
import { DetalleRutina, rutinaGenerada } from '../Models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(
    private http: HttpClient
  ) { }

  saveRutina(rutina: rutinaGenerada) {
    return this.http.post(url + 'createRutina', rutina)
  }

  consultRutina(datosBusqueda: any): Observable<DetalleRutina[]> {
    let params = new HttpParams();
    params = params.append('id_inscripcion', datosBusqueda.id_inscripcion);
    params = params.append('fecha_inicio', datosBusqueda.fecha_inicio);
    params = params.append('fecha_fin', datosBusqueda.fecha_fin);
    params = params.append('halterofilia', datosBusqueda.halterofilia);

    return this.http.get<DetalleRutina[]>(url + 'showRutinas', { params: params });
  }

  deleteRutina(idRutina: number) {
    return this.http.delete(url + 'deleteRutina/' + idRutina);
  }

  updateRutina(rutina: rutinaGenerada, id: number) {
    return this.http.put(url + 'updateRutina/' + id, rutina)
  }
}

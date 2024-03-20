import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenerateInscription, SingleInscription, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class IncripcionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllInscriptions(): Observable<SingleInscription[]> {
    return this.http.get<SingleInscription[]>(url + 'allInscriptions');
  }

  getInscripcionById(id: number): Observable<SingleInscription> {
    return this.http.get<SingleInscription>(url + 'getInscriptionById/' + id);
  }

  saveInscription(inscripcion: GenerateInscription) {
    return this.http.post(url + 'generateInscription', inscripcion);
  }

  updateInscripcion(inscripcion: GenerateInscription, id: number) {
    return this.http.put(url + 'updateInscription/' + id, inscripcion);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { generateInscription, inscripciones, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class IncripcionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllInscriptions(): Observable<inscripciones> {
    return this.http.get<inscripciones>(url + 'allInscriptions');
  }

  saveInscription(inscripcion: generateInscription) {
    return this.http.post(url + 'generateInscription', inscripcion);
  }
}

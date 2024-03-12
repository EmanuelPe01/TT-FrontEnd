import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/Models';
import { generateInscription, singleInscription } from 'src/app/Models/ModelInscription';

@Injectable({
  providedIn: 'root'
})
export class IncripcionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllInscriptions(): Observable<singleInscription[]> {
    return this.http.get<singleInscription[]>(url + 'allInscriptions');
  }

  saveInscription(inscripcion: generateInscription) {
    return this.http.post(url + 'generateInscription', inscripcion);
  }
}

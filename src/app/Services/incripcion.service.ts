import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenerateInscription, InscripcionesActivas, SingleInscription, url } from 'src/app/Models';
import { UserServiceService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IncripcionService {

  constructor(
    private http: HttpClient,
    private userService: UserServiceService
  ) { }

  getAllInscriptions(): Observable<SingleInscription[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<SingleInscription[]>(url + 'allInscriptions', {headers});
  }

  getInscripcionById(id: number): Observable<SingleInscription> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<SingleInscription>(url + 'getInscriptionById/' + id, {headers});
  }

  saveInscription(inscripcion: GenerateInscription) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'generateInscription', inscripcion, {headers});
  }

  updateInscripcion(inscripcion: GenerateInscription, id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.put(url + 'updateInscription/' + id, inscripcion, {headers});
  }

  deleteInsctiption(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete(url + 'deleteInscription/' + id, {headers});
  }

  getActiveInscription(): Observable<InscripcionesActivas[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<InscripcionesActivas[]>(url + 'getActiveInscription', {headers});
  }
}

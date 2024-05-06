import { Injectable } from '@angular/core';
import { rutinaGenerada } from '../Models';
import { HttpClient } from '@angular/common/http';
import { url } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(
    private http: HttpClient
  ) { }

  saveRutina(rutina: rutinaGenerada) {
    return this.http.post(url + 'createRutina' , rutina)
  }
}

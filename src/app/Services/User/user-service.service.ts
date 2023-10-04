import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registrarCliente, url } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  saveClient(cliente: registrarCliente){
    return this.http.post(url + 'registerClient', cliente);
  } 
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from './user.service';
import { SingleComment, url } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient,
    private userService: UserServiceService
  ) { }

  getComments(idIncripcion: number): Observable<SingleComment[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.get<SingleComment[]>(url +'showPostByInscription/' + idIncripcion, {headers})
  }

  createPost(comentario: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post(url + 'createPost', comentario, {headers})
  }
}

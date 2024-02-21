import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { infoLogin } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-controller',
  templateUrl: './screen-controller.component.html',
  styleUrls: ['./screen-controller.component.css']
})
export class ScreenControllerComponent {
  userInformation: infoLogin | undefined;
  navBarBrand: string = "Rutinas";
  urls: { nombre: string, url: string }[] = [];
  labelNavBar: string = "";

  constructor (
    private userService: UserServiceService,
    private route: Router
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.route.navigate(['/']);
        return throwError(() => new Error("Validation Failed"));
      })
    ).subscribe(
      (data: infoLogin) => {
        this.userInformation = data;
        this.labelNavBar = "Hola " + this.userInformation.user.name
        switch(this.userInformation.user.rol.id) {
          case 1: 
            this.urls = [
              {nombre:  'Rutinas', url: '/dash-board'},
              {nombre:  'Comentarios', url: '/dash-board'}
            ]
            break;
          case 2:
            this.urls = [
              {nombre:  'Rutinas', url: '/dash-board'}
            ]
            break;
          case 3:
            this.urls = [
              {nombre:  'Rutinas', url: '/dash-board'}
            ]
            break;
          default:
            console.log("Sin información");
        }
      }
    )    
  }
}

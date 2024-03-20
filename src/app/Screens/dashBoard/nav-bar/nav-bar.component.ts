import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserServiceService } from 'src/app/Services/User/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() navBarBrand: string = "";
  @Input() urls: { nombre: string, url: string }[] = [];
  @Input() labelNavBar: string = "";

  constructor (
    private user_service: UserServiceService,
    private route: Router
  ) { }

  logOut() {
    this.user_service.logout().
    pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error("Error de conexión"));
      })
    ).subscribe(
      (data) => {
        this.user_service.deleteToken();
        this.route.navigate(['/']);
      }
    )
  }

  setItemName(itemName: string) {
    this.navBarBrand = itemName;
  }
}

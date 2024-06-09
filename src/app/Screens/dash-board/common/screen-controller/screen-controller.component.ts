import { Component } from '@angular/core';
import { DetailInscription, InfoLogin } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-screen-controller',
  templateUrl: './screen-controller.component.html',
  styleUrls: ['./screen-controller.component.css']
})
export class ScreenControllerComponent {
  userInformation: InfoLogin | undefined;
  inscriptionInformation: DetailInscription | undefined;
  navBarBrand: string = "MERO CrossFit";
  urls: { nombre: string, url: string }[] = [];
  labelNavBar: string = "";
  isLoading: boolean = true;
  showDashBoard: boolean = false;

  constructor(
    private userService: UserServiceService,
    private route: Router
  ) { }

  async ngOnInit() {
    this.userService.isAuthenticated().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401){
          this.userService.deleteToken()
          this.route.navigate(['/']);
          this.showErrorMessage("Ocurró un error, por favor inicia sesión nuevamente");
        }
        else if (error.status == 500)
          this.showErrorMessage("Error en el servidor, intente más tarde");
        return "";
      })
    ).subscribe((data: InfoLogin | any) => {
      this.userInformation = data;
      this.userService.detailInscription().pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401){
            this.userService.deleteToken()
            this.route.navigate(['/']);
            this.showErrorMessage("Ocurró un error, por favor inicia sesión nuevamente");
          }
          else if (error.status == 500)
            this.showErrorMessage("Error en el servidor, intente más tarde");
          return "";
        })
      ).subscribe((data: DetailInscription | any) => {
        this.inscriptionInformation = data;
        const rutaNavegacion = this.setTitles();
        this.isLoading = false;
        this.route.navigate([rutaNavegacion]);
      })
    })
  }

  setTitles() {
    let rutaNavegacion: string = ''
    this.labelNavBar = "Hola " + this.userInformation?.user.name
    if (this.inscriptionInformation && (this.inscriptionInformation.detalle.estado === 1 || this.inscriptionInformation.rol.id >= 2)) {
      this.navBarBrand = 'Rutinas';
      switch (this.userInformation?.user.rol.id) {
        case 1:
          rutaNavegacion = '/dash-board/customer/rutinas'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/customer/rutinas' },
            { nombre: 'Comentarios', url: '/dash-board/customer/comentarios' },
            { nombre: 'Perfil', url: '/dash-board/customer/perfil' }
          ]
          break;
        case 2:
          rutaNavegacion = '/dash-board/trainer/rutinas'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/trainer/rutinas' },
            { nombre: 'Ejercicios', url: '/dash-board/trainer/ejercicios' },
            { nombre: 'Comentarios', url: '/dash-board/trainer/comentarios' },
            { nombre: 'Perfil', url: '/dash-board/trainer/perfil' }
          ]
          break;
        case 3:
          rutaNavegacion = '/dash-board/admin/rutinas'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/admin/rutinas' },
            { nombre: 'Ejercicios', url: '/dash-board/admin/ejercicios' },
            { nombre: 'Usuarios', url: '/dash-board/admin/usuarios' },
            { nombre: 'Inscripciones', url: '/dash-board/admin/inscripciones' },
            { nombre: 'Perfil', url: '/dash-board/admin/perfil' }
          ]
          break;
        default:
          this.showErrorMessage('Error en el sistema, intente más tarde')
      }
      this.showDashBoard = true;
    } else {
      this.showDashBoard = false;
      rutaNavegacion = '/dash-board'
    }
    return rutaNavegacion;
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonColor: "#000",
      confirmButtonText: "Aceptar",
    })
  }
}

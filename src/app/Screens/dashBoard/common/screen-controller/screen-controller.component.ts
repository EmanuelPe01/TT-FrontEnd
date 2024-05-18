import { Component } from '@angular/core';
import { DetailInscription, InfoLogin } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.userInformation = await this.userService.isAuthenticated().toPromise().
      then((data) => {return data}).catch((data) => {
        this.userService.deleteToken()
        this.route.navigate(['/']);
        return undefined
      });
    this.inscriptionInformation = await this.userService.detailInscription().toPromise().
      then(data => { return data }).catch((data) => {
        return undefined;
      });
    const rutaNavegacion = this.setTitles();
    this.isLoading = false;
    this.route.navigate([rutaNavegacion]);
  }

  setTitles() {
    let rutaNavegacion: string = ''
    this.labelNavBar = "Hola " + this.userInformation?.user.name
    if (this.inscriptionInformation && (this.inscriptionInformation.detalle.estado === 1 || this.inscriptionInformation.rol.id >= 2)) {
      this.navBarBrand = 'Rutinas';
      switch (this.userInformation?.user.rol.id) {
        case 1:
          rutaNavegacion = '/dash-board/user'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/user' },
          ]
          break;
        case 2:
          rutaNavegacion = '/dash-board/admin'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/admin' }
          ]
          break;
        case 3:
          rutaNavegacion = '/dash-board/admin/ejercicios'
          this.urls = [
            { nombre: 'Rutinas', url: '/dash-board/admin/rutinas' },
            { nombre: 'Inscripciones', url: '/dash-board/admin/inscripciones' },
            { nombre: 'Ejercicios', url: '/dash-board/admin/ejercicios'}
          ]
          break;
        default:
          console.log("Sin información");
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

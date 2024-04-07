import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { tipoEjercicio } from 'src/app/Models';
import { EjercicioService } from 'src/app/Services/ejercicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-ejercicios',
  templateUrl: './consulta-ejercicios.component.html',
  styleUrls: ['./consulta-ejercicios.component.css']
})
export class ConsultaEjerciciosComponent {
  isLoading: boolean = false
  criterioEjercicio: string = ''
  criterioTipoEjercicio: string = ''
  nuevoTipoEjercicio: string = ''
  tiposEjercicio: tipoEjercicio[] = []

  constructor(
    private ejercicioService: EjercicioService,
  ) {

  }

  ngOnInit() {
    this.getTiposEjercicio()
  }

  getTiposEjercicio() {
    this.ejercicioService.getAllTiposEjercicio().
      pipe().
      subscribe((data: tipoEjercicio[]) => {
        this.tiposEjercicio = data;
      })
  }

  createTipoEjercicio() {
    if (this.nuevoTipoEjercicio) {
      this.ocultarModal('nuevoTipoEjercicio');
      this.showLoadingMessage(true, 'Guardando');
      const nombre_tipo = {
        'nombre_tipo': this.nuevoTipoEjercicio
      }
      this.ejercicioService.createTipoEjercicio(nombre_tipo).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '');
          switch (error.status) {
            case 404:
              this.showErrorMessage("El email no está registrado");
              break;
            case 500:
              this.showErrorMessage("Error de conexión");
              break;
            default:
              this.showErrorMessage("Error inesperado");
              console.log(error)
          }
          return "";
        })
      ).subscribe(
        (data: any) => {
          this.showLoadingMessage(false, '');
          setTimeout(() => { }, 100);
          this.showMessageSucces(data.message);
          this.getTiposEjercicio();
        })
    }
  }

  ocultarModal(idModal: string) {
    const modalElement = document.getElementById(idModal);
    const modalBackdrop = document.getElementsByClassName('modal-backdrop');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none;');
    }
    if (modalBackdrop[0]) {
      document.body.removeChild(modalBackdrop[0]);
    }
  }

  filterByParams() {
    console.log(this.criterioEjercicio)
    console.log(this.criterioTipoEjercicio)
  }

  showMessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonColor: "#000",
      confirmButtonText: "Aceptar",
    })
  }

  showLoadingMessage(flag: boolean, title: string) {
    if (flag) {
      Swal.fire({
        title: title,
        didOpen: () => {
          Swal.disableButtons();
          Swal.showLoading(Swal.getConfirmButton());
        }
      });
    }
  }
}
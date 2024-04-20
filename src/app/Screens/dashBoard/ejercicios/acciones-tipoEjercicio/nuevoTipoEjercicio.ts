import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { catchError } from 'rxjs';
import { EjercicioService } from 'src/app/Services/ejercicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'nuevoTipoEjercicio',
  template: `
      <div class="modal fade" id="nuevoTipoEjercicio" tabindex="-1" aria-labelledby="nuevoTipoEjercicioLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="nuevoTipoEjercicioLabel">Agregar tipo de ejercicio</h1>
                </div>
                <div class="modal-body">
                    <div class="textInputWrapper">
                        <input placeholder="Nombre del tipo de ejercicio" type="text" class="textInput"
                            [(ngModel)]="nuevoTipoEjercicio">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark" style="
                        --bs-btn-font-size: 1rem;
                        --bs-btn-padding-y: .4rem; 
                        --bs-btn-padding-x: .6rem;
                        text-decoration: none;
                    " data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" style="
                        --bs-btn-font-size: 1rem;
                        --bs-btn-padding-y: .4rem; 
                        --bs-btn-padding-x: .6rem;
                        text-decoration: none;
                        --bs-btn-color: #fff;
                        --bs-btn-bg: #000;
                        --bs-btn-border-color: #fff;
                        --bs-btn-hover-color: #000;
                        --bs-btn-hover-bg: #fff;
                        --bs-btn-hover-border-color: #000;
                        --bs-btn-active-color: #000;
                        --bs-btn-active-bg: #fff;
                        --bs-btn-active-border-color: #000;
                    " (click)="createTipoEjercicio()">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./style.css']
})
export class NuevoTipoEjercicioComponent {
  nuevoTipoEjercicio: string = ''
  @Output() actualizarTiposEjercicios = new EventEmitter<any>();

  constructor(
    private ejercicioService: EjercicioService,
  ){}

  createTipoEjercicio() {
    if (this.nuevoTipoEjercicio) {
      this.ocultarModal('nuevoTipoEjercicio')
      this.showLoadingMessage(true, 'Guardando')
      const nombre_tipo = {
        'nombre_tipo': this.nuevoTipoEjercicio
      }
      this.ejercicioService.createTipoEjercicio(nombre_tipo).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '')
          switch (error.status) {
            case 400:
              this.showErrorMessage('Este nombre ya está registrado')
              break
            case 500:
              this.showErrorMessage("Error de conexión")
              break
            default:
              this.showErrorMessage("Error inesperado")
              console.log(error)
          }
          return ""
        })
      ).subscribe(
        (data: any) => {
          this.showLoadingMessage(false, '')
          this.nuevoTipoEjercicio = ''
          setTimeout(() => { }, 100)
          this.showMessageSucces(data.message)
          this.actualizarTiposEjercicios.emit();
        })
    }
  }

  ocultarModal(idModal: string) {
    const modalElement = document.getElementById(idModal)
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')
    if (modalElement) {
      modalElement.classList.remove('show')
      modalElement.setAttribute('aria-hidden', 'true')
      modalElement.setAttribute('style', 'display: none')
    }
    if (modalBackdrop[0]) {
      document.body.removeChild(modalBackdrop[0])
    }
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
          Swal.disableButtons()
          Swal.showLoading()
        }
      })
    }
  }
}

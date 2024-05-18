import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs';
import { EjercicioService } from 'src/app/Services/ejercicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'editarUnidadMedida',
  template: `
      <button class="btn btn-outline-dark" style="text-decoration: none;" 
        (click)="childModal.show()">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <div class="modal fade" bsModal #childModal="bs-modal" role="dialog" id="editarUnidadMedida" tabindex="-1" aria-labelledby="nuevoUnidadMedidaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="-webkit-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64); -moz-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);
                box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editarUnidadMedidaLabel">Editar unidad de medida</h1>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="childModal.hide()"></button>
                </div>
                <div class="modal-body">
                    <div class="textInputWrapper">
                        <input placeholder="Nuevo nombre de la unidad de medida" type="text" class="textInput"
                            [(ngModel)]="nombreUnidadMedida">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark" style="
                        --bs-btn-font-size: 1rem;
                        --bs-btn-padding-y: .4rem; 
                        --bs-btn-padding-x: .6rem;
                        text-decoration: none;
                    " (click)="childModal.hide()">Cancelar</button>
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
                    " (click)="editarUnidadMedida()">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./style.css']
})
export class EditarUnidadMedidaComponent {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @Input() nombreUnidadMedida: string = ''
  @Input() idUnidadMedida: number = 0
  @Output() actualizarUnidadesMedida = new EventEmitter<any>();

  constructor(
    private ejercicioService: EjercicioService,
  ){}

  editarUnidadMedida() {
    if(this.idUnidadMedida && this.nombreUnidadMedida){
      if(this.childModal) this.childModal.hide()
      this.showLoadingMessage(true, 'Actualizando')
      const unidad_medida = {
        'unidad_medida': this.nombreUnidadMedida
      }
      this.ejercicioService.updateUnidadMedida(this.idUnidadMedida, unidad_medida).pipe(
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
      ).subscribe((data: any)=> {
        this.showLoadingMessage(false, '')
        this.idUnidadMedida = 0
        this.nombreUnidadMedida = ''
        setTimeout(() => { }, 100)
        this.showMessageSucces(data.message)
        this.actualizarUnidadesMedida.emit();
      })
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

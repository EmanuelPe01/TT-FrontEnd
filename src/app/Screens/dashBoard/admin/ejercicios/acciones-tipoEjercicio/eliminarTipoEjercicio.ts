import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output, Renderer2 } from "@angular/core";
import { catchError } from "rxjs";
import { tipoEjercicio } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import Swal from "sweetalert2";

@Component({
    selector: 'eliminarTipoEjercicio',
    template: `
      <div class="modal fade" id="eliminarTipoEjercicio" tabindex="-1" aria-labelledby="eliminarTipoEjercicioLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="eliminarTipoEjercicioLabel">Eliminar tipo de ejercicio</h1>
                </div>
                <div class="modal-body">
                    <div class="input-container">
                        <label class="label" for="tipoEjercicio">Tipo de ejercicio</label>
                        <select id="tipoEjercicio" class="select-estatus" [(ngModel)]="idTipoEjercicio">
                            <option *ngFor="let tEjercicio of tiposEjercicio" [value]="tEjercicio.id">
                                {{tEjercicio.nombre_tipo}}</option>
                        </select>
                        <div class="underline"></div>
                    </div>
                    <div class="form-check">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            ¿Seguro que desea eliminar?
                        </label>
                        <input class="form-check-input" type="checkbox" [(ngModel)]="confirmDeleteTipoEjercicio"
                            id="flexCheckIndeterminate">
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
                    " (click)="eliminarTipoEjercicio()">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./style.css']
})

export class EliminarTipoEjercicioComponent {
  idTipoEjercicio: number | undefined
  confirmDeleteTipoEjercicio: boolean = false
  @Input() tiposEjercicio: tipoEjercicio[] = []
  @Output() actualizarTiposEjercicios = new EventEmitter<any>();
  @Output() actualizarListaEjercicios = new EventEmitter<any>();

  constructor(
    private ejercicioService: EjercicioService,
    private renderer: Renderer2
  ){}

  eliminarTipoEjercicio() {
    if(this.idTipoEjercicio && this.confirmDeleteTipoEjercicio){
      this.ocultarModal('eliminarTipoEjercicio')
      this.showLoadingMessage(true, 'Eliminando')
      this.ejercicioService.deleteTipoEjercicio(this.idTipoEjercicio).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '')
          switch (error.status) {
            case 404:
              this.showErrorMessage('Registro no encontrado')
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
        this.idTipoEjercicio = undefined
        this.confirmDeleteTipoEjercicio = false
        setTimeout(() => { }, 100)
        this.showMessageSucces(data.message)
        this.actualizarTiposEjercicios.emit();
        this.actualizarListaEjercicios.emit();
      })
    }
  }

  ocultarModal(idModal: string) {
    const modalElement = document.getElementById(idModal)
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    if (modalElement) {
      modalElement.classList.remove('show')
      modalElement.setAttribute('aria-hidden', 'true')
      modalElement.setAttribute('style', 'display: none')
    }
    modalBackdrops.forEach(backdrop => {
      this.renderer.removeChild(document.body, backdrop);
    });
    this.renderer.removeAttribute(document.body, 'style');
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.removeAttribute(document.body, 'data-bs-overflow');
    this.renderer.removeAttribute(document.body, 'data-bs-padding-right');
    
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
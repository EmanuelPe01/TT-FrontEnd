import { Component, EventEmitter, Input, Output, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { tipoEjercicio, getDetalleEjercicio, detalleEjercicio, UnidadMedida } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import Swal from "sweetalert2";

@Component({
  selector: 'nuevoEjercicio',
  template: `
        <div class="modal fade" id="agregarEjercicio" tabindex="-1" aria-labelledby="agregarEjercicioLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <form (ngSubmit)="storeEjercicio()" [formGroup]="formCrearEjercicio">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="agregarEjercicioLabel">Agregar ejercicio</h1>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-md-center">
                                <div class="col col-3">
                                    <div class="input-container">
                                        <label class="label" for="tipoEjercicio">Tipo de ejercicio</label>
                                        <select id="tipoEjercicio" class="select-estatus" formControlName="id_tipo_ejercicio">
                                            <option *ngFor="let tEjercicio of tiposEjercicio" [value]="tEjercicio.id">
                                                {{tEjercicio.nombre_tipo}}</option>
                                        </select>
                                        <div class="underline"></div>
                                    </div>
                                    <div
                                        *ngIf="formCrearEjercicio.get('id_tipo_ejercicio')?.hasError('required') && formCrearEjercicio.get('id_tipo_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-5">
                                    <div class="textInputWrapper">
                                        <input placeholder="Nombre del ejercicio" type="text" class="textInput"
                                            formControlName="nombre_ejercicio">
                                    </div>
                                    <div
                                        *ngIf="formCrearEjercicio.get('nombre_ejercicio')?.hasError('required') && formCrearEjercicio.get('nombre_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-4">
                                    <div class="input-container">
                                        <label class="label" for="tipoEjercicio">Tipo de ejercicio</label>
                                        <select id="tipoEjercicio" class="select-estatus" formControlName="id_unidad_medida">
                                            <option *ngFor="let uMedida of unidadesMedida" [value]="uMedida.id">
                                                {{uMedida.unidad_medida}}</option>
                                        </select>
                                        <div class="underline"></div>
                                    </div>
                                    <div
                                        *ngIf="formCrearEjercicio.get('unidad_medida')?.hasError('required') && formCrearEjercicio.get('unidad_medida')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-12">
                                    <div class="textInputWrapper">
                                        <input placeholder="Demostración (Video de Youtube)" type="text" class="textInput"
                                            formControlName="demo_ejercicio" (input)="cargarVideo()">
                                    </div>
                                    <div
                                        *ngIf="formCrearEjercicio.get('demo_ejercicio')?.hasError('required') && formCrearEjercicio.get('demo_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                    <div *ngIf="formCrearEjercicio.get('demo_ejercicio')?.errors?.['pattern'];">
                                        <p class="errorText">Debe ser un vídeo de YouTube *</p>
                                    </div>
                                </div>
                                <div *ngIf="showVideo" class="col col-10">
                                    <iframe class="YouTubeVideo"
                                        [src]="urlYoutubeGenerada"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerpolicy="strict-origin-when-cross-origin"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-dark" style="
                            --bs-btn-font-size: 1rem;
                            --bs-btn-padding-y: .4rem; 
                            --bs-btn-padding-x: .6rem;
                            text-decoration: none;
                        " data-bs-dismiss="modal" (click)="limpiarForm()">Cancelar</button>
                            <button class="btn btn-primary" style="
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
                        ">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
  styleUrls: ['./style.css']
})
export class NuevoEjercicioComponent {
  formCrearEjercicio: FormGroup
  showVideo: boolean = false
  urlYoutubeGenerada: SafeResourceUrl = ''
  detalleEjercicios: getDetalleEjercicio[] = []
  @Input() tiposEjercicio: tipoEjercicio[] = []
  @Input() unidadesMedida: UnidadMedida[] = []
  @Output() actualizarListaEjercicios = new EventEmitter<any>();

  constructor(
    private ejercicioService: EjercicioService,
    private form: FormBuilder,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {
    this.formCrearEjercicio = this.form.group({
      id_tipo_ejercicio: ['', Validators.required],
      nombre_ejercicio: ['', Validators.required],
      id_unidad_medida: ['', Validators.required],
      demo_ejercicio: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:\?[^\s]*)?$/)]]
    })
  }

  storeEjercicio() {
    if (this.formCrearEjercicio.valid) {
      console.log(this.formCrearEjercicio.value)
      this.ocultarModal('agregarEjercicio')
      this.showLoadingMessage(true, 'Guardando')
      const detalleEjercicio: detalleEjercicio = this.formCrearEjercicio.value
      detalleEjercicio.id_tipo_ejercicio = Number(this.formCrearEjercicio.get('id_tipo_ejercicio')?.value)
      this.ejercicioService.createEjercicio(detalleEjercicio).
        pipe().
        subscribe((data: any) => {
          this.showLoadingMessage(false, '')
          this.formCrearEjercicio.reset()
          this.showMessageSucces(data.message)
          this.actualizarListaEjercicios.emit();
        })
    }
  }

  cargarVideo() {
    const urlYoutubeEntrada = this.formCrearEjercicio.get('demo_ejercicio')?.value
    const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:\?[^\s]*)?$/
    const matches = urlYoutubeEntrada.match(regExp)

    if (matches && matches[4]) {
      const videoId = matches[4]
      this.showVideo = true
      this.urlYoutubeGenerada = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId)
    } else {
      this.showVideo = false
    }
  }

  limpiarForm() {
    this.formCrearEjercicio.reset()
    this.showVideo = false
    this.urlYoutubeGenerada = ''
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
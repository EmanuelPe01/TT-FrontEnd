import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { catchError } from "rxjs";
import { detalleEjercicio, getDetalleEjercicio, tipoEjercicio } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import Swal from "sweetalert2";

@Component({
    selector: 'editarEjercicio',
    template: `
        <div class="modal fade" id="editarEjercicio" tabindex="-1" aria-labelledby="editarEjercicioLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <form (ngSubmit)="storeEjercicio()" [formGroup]="formEditarEjercicio">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editarEjercicioLabel">Editar ejercicio</h1>
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
                                        *ngIf="formEditarEjercicio.get('id_tipo_ejercicio')?.hasError('required') && formEditarEjercicio.get('id_tipo_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-5">
                                    <div class="textInputWrapper">
                                        <input placeholder="Nombre del ejercicio" type="text" class="textInput"
                                            formControlName="nombre_ejercicio">
                                    </div>
                                    <div
                                        *ngIf="formEditarEjercicio.get('nombre_ejercicio')?.hasError('required') && formEditarEjercicio.get('nombre_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-4">
                                    <div class="textInputWrapper">
                                        <input placeholder="Unidad de medida" type="text" class="textInput"
                                            formControlName="unidad_medida">
                                    </div>
                                    <div
                                        *ngIf="formEditarEjercicio.get('unidad_medida')?.hasError('required') && formEditarEjercicio.get('unidad_medida')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                </div>
                                <div class="col col-12">
                                    <div class="textInputWrapper">
                                        <input placeholder="Demostración (Video de Youtube)" type="text" class="textInput"
                                            formControlName="demo_ejercicio" (input)="cargarVideo()">
                                    </div>
                                    <div
                                        *ngIf="formEditarEjercicio.get('demo_ejercicio')?.hasError('required') && formEditarEjercicio.get('demo_ejercicio')?.touched;">
                                        <p class="errorText">Campo requerido *</p>
                                    </div>
                                    <div *ngIf="formEditarEjercicio.get('demo_ejercicio')?.errors?.['pattern'];">
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

export class EditarEjericicioComponent implements OnChanges {
    formEditarEjercicio: FormGroup
    showVideo: boolean = true
    urlYoutubeGenerada: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    @Input() detalleEjercicio: getDetalleEjercicio | undefined
    @Input() tiposEjercicio: tipoEjercicio[] = []
    @Output() actualizarListaEjercicios = new EventEmitter<any>();

    constructor(
        private ejercicioService: EjercicioService,
        private form: FormBuilder,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2
    ) {
        this.formEditarEjercicio = this.form.group({
            id_tipo_ejercicio: ['', Validators.required],
            nombre_ejercicio: ['', Validators.required],
            unidad_medida: ['', Validators.required],
            demo_ejercicio: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:\?[^\s]*)?$/)]]
        })
    }

    storeEjercicio() {
        if (this.formEditarEjercicio.valid && this.detalleEjercicio) {
            this.ocultarModal('editarEjercicio')
            this.showLoadingMessage(true, 'Guardando')
            const ejercicioEditado: detalleEjercicio = this.formEditarEjercicio.value
            ejercicioEditado.id_tipo_ejercicio = Number(this.formEditarEjercicio.get('id_tipo_ejercicio')?.value)
            this.ejercicioService.editEjercicio(ejercicioEditado, this.detalleEjercicio.id).
                pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.showLoadingMessage(false, '');
                        if (error.status == 403)
                            this.showErrorMessage("El nombre del ejercicio ya existe");
                        else if (error.status == 500)
                            this.showErrorMessage("Error en el servidor, intente más tarde");
                        else if (error.status == 404)
                            this.showErrorMessage("No se encontró el registro");
                        return "";
                    })
                ).subscribe((data: any) => {
                    this.showLoadingMessage(false, '')
                    this.formEditarEjercicio.reset()
                    this.showMessageSucces(data.message)
                    this.actualizarListaEjercicios.emit();
                })
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["detalleEjercicio"] && changes["detalleEjercicio"].currentValue) {
            this.showVideo = true
            const videoUrl = changes["detalleEjercicio"].currentValue.demo_ejercicio;
            this.urlYoutubeGenerada = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
            this.formEditarEjercicio.setValue({
                id_tipo_ejercicio: this.detalleEjercicio?.id_tipo_ejercicio,
                nombre_ejercicio: this.detalleEjercicio?.nombre_ejercicio,
                unidad_medida: this.detalleEjercicio?.unidad_medida,
                demo_ejercicio: this.detalleEjercicio?.demo_ejercicio
            })
        }
    }

    cargarVideo() {
        const urlYoutubeEntrada = this.formEditarEjercicio.get('demo_ejercicio')?.value
        const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:\?[^\s]*)?$/
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
        this.formEditarEjercicio.reset()
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
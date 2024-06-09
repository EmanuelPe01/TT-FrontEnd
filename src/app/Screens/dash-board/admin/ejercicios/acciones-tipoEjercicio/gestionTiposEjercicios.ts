import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { catchError } from "rxjs";
import { tipoEjercicio } from "src/app/Models";
import { EjercicioService } from 'src/app/Services/ejercicio.service'
import Swal from "sweetalert2";

@Component({
    selector: 'gestionTiposEjercicio',
    template: `
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
            width: 100%;
        " (click)="parentModal.show()">
            <i class="fa-solid fa-gears"></i>
            Administrar tipos de ejercicio
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gestionTiposEjerciciosLabel">Aministrar tipos de ejercicios</h1>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="recargarInfo()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive-xl">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">     
                                    <tr
                                        *ngFor="let tEjercicio of tiposEjercicio">
                                        <td>{{tEjercicio.nombre_tipo}}</td>
                                        <td>
                                            <div class="row">
                                                <div class="col col-4">
                                                    <editarTipoEjercicio 
                                                        [idTipoEjercicio]="tEjercicio.id"
                                                        [nombreTipoEjercicio]="tEjercicio.nombre_tipo"
                                                        (actualizarTiposEjercicios)="getTiposEjercicio()"
                                                    ></editarTipoEjercicio>
                                                </div>
                                                <div class="col col-4">
                                                    <a class="btn btn-outline-dark" style="
                                                        --bs-btn-font-size: 1rem;
                                                        --bs-btn-padding-y: .4rem; 
                                                        --bs-btn-padding-x: .6rem;
                                                        --bs-btn-hover-bg: rgb(235, 33, 33);
                                                        --bs-btn-hover-border-color: rgb(235, 33, 33);
                                                        "
                                                        (click)="deleteTipoEjercicio(tEjercicio.id)">
                                                        <i class="fa-solid fa-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <nuevoTipoEjercicio 
                            (actualizarTiposEjercicios)="getTiposEjercicio()"
                        ></nuevoTipoEjercicio>
                    </div>    
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class GestionTiposEjercicioComponent {
    @Input() tiposEjercicio: tipoEjercicio[] = []
    @Output() actualizarTiposEjercicios = new EventEmitter<any>();
    @Output() actualizarEjercicios = new EventEmitter<any>();
    @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;

    constructor(
        private ejercicioService: EjercicioService
    ) { }

    getTiposEjercicio() {
        this.ejercicioService.getAllTiposEjercicio().
            pipe().
            subscribe((data: tipoEjercicio[]) => {
                this.tiposEjercicio = data
            })
    }

    deleteTipoEjercicio(idTipoEjercicio: number) {
        Swal.fire({
            title: "¿Estas seguro?",
            text: `Esta acción eliminará a todos los ejercicios que tengan esta categoría`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#6E1300",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.showLoadingMessage(true, 'Eliminando')
                this.ejercicioService.deleteTipoEjercicio(idTipoEjercicio).pipe(
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
                        }
                        return ""
                    })
                ).subscribe((data: any) => {
                    this.showLoadingMessage(false, '')
                    setTimeout(() => { }, 100)
                    this.getTiposEjercicio()
                    this.showMessageSucces(data.message)                    
                })
            }
        });
    }

    recargarInfo() {
        if(this.parentModal) {
            this.parentModal.hide()
            this.actualizarTiposEjercicios.emit();
            this.actualizarEjercicios.emit();
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
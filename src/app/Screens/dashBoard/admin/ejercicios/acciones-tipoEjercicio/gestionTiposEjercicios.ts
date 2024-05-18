import { Component, Input, Renderer2 } from "@angular/core";
import { tipoEjercicio } from "src/app/Models";
import { EjercicioService } from 'src/app/Services/ejercicio.service'

@Component({
    selector: 'gestionTiposEjercicio',
    template: `
        <div class="modal fade" id="gestionTiposEjercicios" tabindex="-1" aria-labelledby="gestionTiposEjercicios"
    aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gestionTiposEjerciciosLabel">Aministrar tipos de ejercicios</h1>
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
                                                    <a class="btn btn-outline-dark" style="
                                                            --bs-btn-font-size: 1rem;
                                                            --bs-btn-padding-y: .4rem; 
                                                            --bs-btn-padding-x: .6rem;
                                                            --bs-btn-hover-bg: rgb(229, 212, 22);
                                                            --bs-btn-hover-border-color: rgb(229, 212, 22);
                                                        " data-bs-toggle="modal" data-bs-target="#editarEjercicio">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </a>
                                                </div>
                                                <div class="col col-4">
                                                    <a class="btn btn-outline-dark" style="
                                                            --bs-btn-font-size: 1rem;
                                                            --bs-btn-padding-y: .4rem; 
                                                            --bs-btn-padding-x: .6rem;
                                                            --bs-btn-hover-bg: rgb(235, 33, 33);
                                                            --bs-btn-hover-border-color: rgb(235, 33, 33);
                                                        ">
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
                        <button class="btn btn-outline-dark" style="text-decoration: none;" 
                            data-bs-toggle="modal" data-bs-target="#nuevoTipoEjercicio">
                            <i class="fa-regular fa-plus"></i>
                            Agregar tipo de ejercicio
                        </button>
                    </div>    
                </div>
            </div>
        </div>


        <nuevoTipoEjercicio 
            (actualizarTiposEjercicios)="getTiposEjercicio()"
        ></nuevoTipoEjercicio>
    `,
    styleUrls: ['./style.css']
})

export class GestionTiposEjercicioComponent {
    @Input() tiposEjercicio: tipoEjercicio[] = []

    constructor(
        private ejercicioService: EjercicioService,
        private renderer: Renderer2
    ) {}

    getTiposEjercicio() {
        this.ejercicioService.getAllTiposEjercicio().
            pipe().
            subscribe((data: tipoEjercicio[]) => {
                this.tiposEjercicio = data
        })
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
}
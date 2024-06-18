import { Component, Input } from "@angular/core";
import { InformacionUsuario } from "src/app/Models";

@Component({
    selector: 'ver-usuario',
    template: `
        <button class="btn btn-outline-dark" style="
                --bs-btn-font-size: 1rem;
                --bs-btn-padding-y: .4rem; 
                --bs-btn-padding-x: .6rem;
                --bs-btn-hover-bg: rgb(33, 110, 235);
                --bs-btn-hover-border-color: rgb(33, 110, 235);
            " (click)="parentModal.show()">
            <i class="fa-solid fa-circle-info"></i>
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="dialog-nested-name1" class="modal-title pull-center">Información del usuario</h4>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                    <span aria-hidden="true" class="visually-hidden">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-5">
                    <div class="row">
                        <div class="col col-12 mt-1">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col col-6">
                                            <div class="detail-container">
                                                <input required="" value="{{infoUser?.name}} {{infoUser?.firstSurname}} {{infoUser?.secondSurname}}" id="input-cliente"
                                                    type="text" readonly />
                                                <label class="label" for="input-cliente">Nombre:</label>
                                            </div>
                                        </div>
                                        <div class="col col-6">
                                            <div class="detail-container">
                                                <input required="" value="{{convertirFecha(infoUser?.fecha_nacimiento)}}" id="input-cliente"
                                                    type="date" readonly />
                                                <label class="label" for="input-cliente">Fecha de nacimiento:</label>
                                            </div>
                                        </div>
                                        <div class="col col-6">
                                            <div class="detail-container">
                                                <input required="" value="{{infoUser?.telephone}}" id="input-cliente"
                                                    type="text" readonly />
                                                <label class="label" for="input-cliente">Teléfono:</label>
                                            </div>
                                        </div><div class="col col-6">
                                            <div class="detail-container">
                                                <input required="" value="{{infoUser?.rol?.rol_name}}" id="input-cliente"
                                                    type="text" readonly />
                                                <label class="label" for="input-cliente">Rol:</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-6">
                                            <div class="detail-container">
                                                <input required="" value="{{infoUser?.email}}"
                                                    id="input-entrenador" type="text" readonly />
                                                <label class="label" for="input-entrendador">Email:</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class VerUsuarioComponent {
    @Input() infoUser: InformacionUsuario | undefined

    convertirFecha(fecha?: string): string {
        if(fecha){
            const [dia, mes, año] = fecha.split('/');
            return `${año}-${mes}-${dia}`;
        }          
        return ''            
    }
}
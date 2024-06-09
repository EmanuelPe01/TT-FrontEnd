import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { catchError, throwError } from "rxjs";
import { InfoLogin } from "src/app/Models";
import { UserServiceService } from "src/app/Services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: 'cambiar-info-perfil-app',
    template: `
    <button class="btn btn-outline-dark" style="text-decoration: none;" 
        (click)="childModal.show()">
        <i class="fa-solid fa-user-pen"></i>
        Editar información
    </button>
    <div class="modal fade" bsModal #childModal="bs-modal" role="dialog" id="nuevoTipoEjercicio" tabindex="-1" aria-labelledby="nuevoTipoEjercicioLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="-webkit-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64); -moz-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);
                box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="nuevoTipoEjercicioLabel">Editar información del perfil</h1>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="childModal.hide()"></button>
                </div>
                <form (ngSubmit)="guardarCambios()" [formGroup]="formInfoPerfil">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" id="Nombre_edit"
                                        type="text" formControlName="name"/>
                                    <label class="label" for="Nombre">Nombre:</label>
                                </div>
                            </div>
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" id="pApellido_edit"
                                        type="text" formControlName="firstSurname"/>
                                    <label class="label" for="pApellido">Primer apellido:</label>
                                </div>
                            </div>
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" id="sApellido_edit"
                                        type="text" formControlName="secondSurname"/>
                                    <label class="label" for="sApellido">Segundo apellido:</label>
                                </div>
                            </div>
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" id="telefono_edit"
                                        type="text" formControlName="telephone"/>
                                    <label class="label" for="telefono">Telefono:</label>
                                </div>
                            </div>
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" id="email_edit"
                                        type="text" formControlName="email"/>
                                    <label class="label" for="email">Email:</label>
                                </div>
                            </div>
                            <div class="col col-6">
                                <div class="input-container">
                                    <input required="" 
                                        id="fecha_nacimiento"
                                        (focus)="onFocus()"
                                        (blur)="onBlur()"
                                        [type]="inputFecha"
                                        [max]="fechaMaxima"
                                        formControlName="fecha_nacimiento"/>
                                    <label class="label" for="fecha_nacimiento">Fecha de nacimiento:</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" (click)="childModal.hide()">
                            Cancelar
                        </button>
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
    styleUrls: ['./styles.css']
})

export class CambiarInfoPerfilComponent implements OnChanges {
    @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
    @Input() userInformation: InfoLogin | undefined
    formInfoPerfil: FormGroup
    inputFecha: string = 'date'
    fechaMaxima: string = ''
    idUser: number = 0

    constructor(
        private _form: FormBuilder,
        private userService: UserServiceService
    ) {
        this.formInfoPerfil = this._form.group({
            name: ['', [Validators.required]],
            firstSurname: ['', [Validators.required]],
            secondSurname: ['', [Validators.required]],
            telephone: ['', [Validators.required, this.validarNumeroTelefono]],
            email: ['', [Validators.required, Validators.email]],
            fecha_nacimiento: ['', Validators.required]
        })
        this.fechaMaxima = this.calculateMinDate()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["userInformation"] && changes["userInformation"].currentValue) {
            if(this.userInformation){
                this.idUser = this.userInformation.user.id
                this.formInfoPerfil.patchValue({
                    name: this.userInformation.user.name,
                    firstSurname: this.userInformation.user.firstSurname,
                    secondSurname: this.userInformation.user.secondSurname,
                    telephone: this.userInformation.user.telephone,
                    email: this.userInformation.user.email,
                    fecha_nacimiento: this.userInformation.user.fecha_nacimiento
                })
            }            
        }
    }

    guardarCambios() {
        if (this.formInfoPerfil.valid) {
            if (this.childModal) this.childModal.hide()
            this.showLoadingMessage(true, 'Guardando')
            this.userService.saveInfoPerfil(this.formInfoPerfil.value, this.idUser).pipe(
                catchError((error) => {
                    this.showLoadingMessage(false, '');
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 500:
                                this.showErrorMessage("Error en el servidor, intente más tarde");
                                console.log(error)
                                break;
                            default:
                                this.showErrorMessage("Error inesperado");
                        }
                    } else {
                        this.showErrorMessage("Error de conexión");
                    }
                    return throwError(() => new Error("Login failed"));
                })
            )
                .subscribe((data: any) => {
                    this.showLoadingMessage(false, '')
                    this.showMessageSucces(data.message)
                    window.location.reload();
                })
        }
    }

    calculateMinDate(): string {
        return moment().subtract(5, 'years').format('YYYY-MM-DD');
      }

    onBlur() {
        const fecha = this.formInfoPerfil.get('fecha_nacimiento')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
    }

    validarNumeroTelefono(control: { value: string; }) {
        const telefonoRegex = /^(\d{10})?$/;
        if (telefonoRegex.test(control.value)) {
            return null;
        } else {
            return { telefonoInvalido: true };
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

    showLoadingMessage(flag: boolean, message: string) {
        if (flag) {
            Swal.fire({
                title: message,
                didOpen: () => {
                    Swal.disableButtons();
                    Swal.showLoading();
                }
            });
        }
    }
}
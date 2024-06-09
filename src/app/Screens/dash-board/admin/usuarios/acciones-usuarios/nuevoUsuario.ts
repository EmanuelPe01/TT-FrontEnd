import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { catchError } from "rxjs";
import { RegistrarUsuario } from "src/app/Models";
import { Rol } from "src/app/Models/ModelRol";
import { UserServiceService } from "src/app/Services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: 'nuevo-usuario',
    template: `
        <button class="btn btn-outline-dark" style="
            --bs-btn-font-size: 1rem;
            --bs-btn-padding-y: .4rem; 
            --bs-btn-padding-x: .6rem;
            text-decoration: none;
            width: 100%;
        "(click)="parentModal.show()">
            <i class="fa-solid fa-eraser"></i>
            Agregar usuario
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="dialog-nested-name1" class="modal-title pull-left">Registrar Usuario</h4>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                    <span aria-hidden="true" class="visually-hidden">&times;</span>
                    </button>
                </div>
                <form (ngSubmit)="saveUser()" [formGroup]="formRegistro">
                    <div class="modal-body">                    
                            <div class="row">
                                <div class="col col-12">
                                    <div class="textInputWrapper">
                                        <input 
                                            placeholder="Nombre(s)" 
                                            type="text" 
                                            class="textInput" 
                                            formControlName="name"
                                        >
                                    </div>
                                    <div *ngIf="formRegistro.get('name')?.hasError('required') && formRegistro.get('name')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-12 col-md-6">
                                    <div class="textInputWrapper">
                                        <input 
                                            placeholder="Primer apellido" 
                                            type="text" 
                                            class="textInput" 
                                            formControlName="firstSurname"
                                        >
                                    </div>
                                    <div *ngIf="formRegistro.get('firstSurname')?.hasError('required') && formRegistro.get('firstSurname')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                                <div class="col col-12 col-md-6">
                                    <div class="textInputWrapper">
                                        <input 
                                            placeholder="Segundo apellido" 
                                            type="text" 
                                            class="textInput" 
                                            formControlName="secondSurname"
                                        >
                                    </div>
                                    <div *ngIf="formRegistro.get('secondSurname')?.hasError('required') && formRegistro.get('secondSurname')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-12 col-md-6">
                                    <div class="textInputWrapper">
                                        <input 
                                            placeholder="Teléfono" 
                                            type="text" 
                                            class="textInput" 
                                            formControlName="telephone"
                                        >
                                    </div>
                                    <div *ngIf="formRegistro.get('telephone')?.hasError('required') && formRegistro.get('telephone')?.touched; else ErrorPhone">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                    <ng-template #ErrorPhone>
                                        <div *ngIf="formRegistro.get('telephone')?.hasError('telefonoInvalido') && formRegistro.get('telephone')?.touched">
                                            <p class="errorText">Teléfono inválido</p>
                                        </div>
                                    </ng-template>  
                                </div>
                                <div class="col col-12 col-md-6">
                                    <div class="textInputWrapper">
                                        <input 
                                            placeholder="Email" 
                                            type="text" 
                                            class="textInput" 
                                            formControlName="email"
                                        >
                                    </div>
                                    <div *ngIf="formRegistro.get('email')?.hasError('required') && formRegistro.get('email')?.touched; else ErrorMail">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                    <ng-template #ErrorMail>
                                        <div *ngIf="formRegistro.get('email')?.hasError('email') && formRegistro.get('email')?.touched">
                                            <p class="errorText">Ingresa un correo electrónico válido</p>
                                        </div>
                                    </ng-template>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col col-12 col-md-6">
                                    <div class="input-container">
                                        <label class="label" for="tipoEjercicio">Rol</label>
                                        <select id="tipoEjercicio" class="select-estatus" formControlName="id_rol">
                                            <option selected style="color: darkgrey;">Selecciona el rol para el usuario</option>
                                            <option *ngFor="let rol of listRoles" [value]="rol.id">
                                                {{rol.rol_name}}</option>
                                        </select>
                                        <div class="underline"></div>
                                    </div>
                                </div>
                                <div class="col col-12 col-md-6">
                                    <div class="textInputWrapper">
                                        <input 
                                            required="required"
                                            placeholder="Fecha de nacimiento" 
                                            [type] = "inputFecha"  
                                            class="textInput" 
                                            formControlName="fecha_nacimiento"
                                            (focus)="onFocus()"
                                            (blur)="onBlur()"
                                            [max]="edadMinima"
                                        >
                                    </div> 
                                    <div *ngIf="formRegistro.get('fecha_nacimiento')?.hasError('required') && formRegistro.get('fecha_nacimiento')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" style="
                                    --bs-btn-font-size: 1rem;
                                    --bs-btn-padding-y: .4rem; 
                                    --bs-btn-padding-x: .6rem;
                                    text-decoration: none;
                                " (click)="limpiarForm()">
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
                        ">Aceptar
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class NuevoUsuarioComponent implements OnChanges {
    @Input() listRoles: Rol[] = []
    @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
    @Output() actualizarUsuarios = new EventEmitter<any>();
    formRegistro: FormGroup
    inputFecha: string = ''
    edadMinima: string = ''

    constructor(
        private _form: FormBuilder,
        private userService: UserServiceService
    ) {
        this.formRegistro = this._form.group({
            name: ['', [Validators.required]],
            firstSurname: ['', [Validators.required]],
            secondSurname: ['', [Validators.required]],
            telephone: ['', [Validators.required, this.validarNumeroTelefono]],
            email: ['', [Validators.required, Validators.email]],
            fecha_nacimiento: ['', Validators.required],
            id_rol: ['', Validators.required]
        });
        this.edadMinima = this.calculateMinDate()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["listRoles"] && changes["listRoles"].currentValue) {
            this.reLoadListRoles()
        }
    }

    limpiarForm() {
        if (this.parentModal) {
            this.parentModal.hide()
            this.formRegistro.reset()
        }
    }

    reLoadListRoles() {
        const index = this.listRoles.findIndex(rol => rol.id === 1);
        if (index !== -1) {
            this.listRoles.splice(index, 1);
        }
    }

    saveUser() {
        if (this.formRegistro.valid) {
            this.showLoadingMessage(true);
            const datosForm = this.formRegistro.value;
            delete datosForm.conf_pass;
            const usuario: RegistrarUsuario = datosForm
            usuario.modo = 2;
            this.userService.saveClient(usuario)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.showLoadingMessage(false);
                        if (error.status == 400)
                            this.showErrorMessage("Este correo electrónico ya esta registrado");
                        else if (error.status == 500)
                            this.showErrorMessage("Error en el servidor, intente más tarde");
                        return "";
                    })
                ).subscribe(
                    (data) => {
                        this.showLoadingMessage(false);
                        this.showMessageSucces("Registro exitoso");
                        this.actualizarUsuarios.emit()
                        this.limpiarForm()
                    })
        }
    }
    
    calculateMinDate(): string {
        return moment().subtract(5, 'years').format('YYYY-MM-DD');
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

    showLoadingMessage(flag: boolean) {
        if (flag) {
            Swal.fire({
                title: 'Registrando',
                didOpen: () => {
                    Swal.disableButtons();
                    Swal.showLoading();
                }
            });
        }
    }

    onBlur() {
        const fecha = this.formRegistro.get('fecha_nacimiento')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
    }

    //validación de errores
    validarNumeroTelefono(control: { value: string; }) {
        const telefonoRegex = /^(\d{10})?$/;
        if (telefonoRegex.test(control.value)) {
            return null;
        } else {
            return { telefonoInvalido: true };
        }
    }

}
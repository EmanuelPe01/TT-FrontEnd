import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { UserServiceService } from "src/app/Services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: 'cambiar-pass-app',
    template: `
    <button class="btn btn-outline-dark" style="text-decoration: none;" 
        (click)="childModal.show()">
        <i class="fa-solid fa-user-lock"></i>
        Cambiar contraseña
    </button>
    <div class="modal fade" bsModal #childModal="bs-modal" role="dialog" id="nuevoTipoEjercicio" tabindex="-1" aria-labelledby="nuevoTipoEjercicioLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="-webkit-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64); -moz-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);
                box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.64);">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="nuevoTipoEjercicioLabel">Cambiar contraseña</h1>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="childModal.hide()"></button>
                </div>
                <form (ngSubmit)="cambiarPass()" [formGroup]="formChangePassword">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col col-10">
                                <div class="textInputWrapper">
                                        <input 
                                            required="required"
                                            placeholder="Contraseña actual" 
                                            type="{{inputTypePassAct}}"  
                                            class="textInput" 
                                            formControlName="password"
                                        >
                                </div>
                                <div *ngIf="formChangePassword.get('password')?.hasError('required') && formChangePassword.get('password')?.touched; else ErrorLength">
                                    <p class="errorText">Campo requerido*</p>
                                </div>
                                <ng-template #ErrorLength>  
                                    <div *ngIf="formChangePassword.get('password')?.hasError('minlength') && formChangePassword.get('password')?.touched">
                                        <p class="errorText">Debe contener más de 8 caracteres</p>
                                    </div>
                                </ng-template>
                            </div>
                            <div class="col col-2" style="margin-top: 0.5rem;">
                                <button type="button" class="btn btn-outline-secondary" 
                                        style="
                                            --bs-btn-color: #000;
                                            --bs-btn-hover-bg: #000;
                                            --bs-btn-hover-border-color: #00000000;
                                            --bs-btn-font-size: 1rem;
                                            --bs-btn-padding-y: .4rem; 
                                            --bs-btn-padding-x: .6rem;
                                        "
                                        (click)="showPasswordAct()"
                                >
                                    <i class="{{iconButtonAct}}"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col col-10">
                                <div class="textInputWrapper">
                                    <input 
                                        required="required"
                                        placeholder="Nueva contraseña" 
                                        type="{{inputTypePass}}"  
                                        class="textInput" 
                                        formControlName="new_password"
                                    >
                                </div>
                                <div *ngIf="formChangePassword.get('new_password')?.hasError('required') && formChangePassword.get('new_password')?.touched; else ErrorLength">
                                    <p class="errorText">Campo requerido*</p>
                                </div>
                                <ng-template #ErrorLength>  
                                    <div *ngIf="formChangePassword.get('new_password')?.hasError('minlength') && formChangePassword.get('new_password')?.touched">
                                        <p class="errorText">Debe contener más de 8 caracteres</p>
                                    </div>
                                </ng-template>
                            </div>
                            <div class="col col-2" style="margin-top: 0.5rem;">
                                <button type="button" class="btn btn-outline-secondary" 
                                        style="
                                            --bs-btn-color: #000;
                                            --bs-btn-hover-bg: #000;
                                            --bs-btn-hover-border-color: #00000000;
                                            --bs-btn-font-size: 1rem;
                                            --bs-btn-padding-y: .4rem; 
                                            --bs-btn-padding-x: .6rem;
                                        "
                                        (click)="showPassword()"
                                >
                                    <i class="{{iconButton}}"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col col-10">
                                <div class="textInputWrapper">
                                    <input 
                                        required="required"
                                        placeholder="Confirmar contraseña" 
                                        type="{{inputTypePass_conf}}"  
                                        class="textInput" 
                                        formControlName="conf_pass"
                                    >
                                </div>
                                <div *ngIf="formChangePassword.get('conf_pass')?.hasError('required') && formChangePassword.get('conf_pass')?.touched; else ErrorMatch">
                                    <p class="errorText">Campo requerido*</p>
                                </div>
                                <ng-template #ErrorMatch>
                                    <div *ngIf="formChangePassword.get('conf_pass')?.hasError('noCoincide') && formChangePassword.get('conf_pass')?.touched">
                                        <p class="errorText">Las contraseñas no coinciden</p>
                                    </div>
                                </ng-template>
                            </div>
                            <div class="col col-2" style="margin-top: 0.5rem;">
                                <button type="button" class="btn btn-outline-secondary" 
                                        style="
                                            --bs-btn-color: #000;
                                            --bs-btn-hover-bg: #000;
                                            --bs-btn-hover-border-color: #00000000;
                                            --bs-btn-font-size: 1rem;
                                            --bs-btn-padding-y: .4rem; 
                                            --bs-btn-padding-x: .6rem;
                                        "
                                        (click)="showPassword_conf()"
                                >
                                    <i class="{{iconButton_conf}}"></i>
                                </button>
                            </div>
                        </div>
                        <p class="fs-6 mt-3"><i class="fa-solid fa-circle-info"></i> Al cambiar la contraseña se cerrará sesión</p>
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

export class CambiarPasswordComponent {
    formChangePassword: FormGroup
    flagShowPassAct: boolean = false;
    inputTypePassAct: string = "password";
    iconButtonAct: string = "fa-regular fa-eye";
    flagShowPass: boolean = false;
    inputTypePass: string = "password";
    iconButton: string = "fa-regular fa-eye";
    flagShowPass_conf: boolean = false;
    inputTypePass_conf: string = "password";
    iconButton_conf: string = "fa-regular fa-eye";

    constructor(
        public _form: FormBuilder,
        public userService: UserServiceService,
        public router: Router
    ) {
        this.formChangePassword = this._form.group({
            password: ['', Validators.required],
            new_password: ['', [Validators.required, Validators.minLength(8)]],
            conf_pass: ['', [Validators.required]],
        }, {
            validator: this.passwordMatchValidator
        })
    }

    cambiarPass() {
        if(this.formChangePassword.valid) {
            this.showLoadingMessage(true, 'Guardando')
            this.userService.changePassword(this.formChangePassword.value).pipe(
                catchError((error) => {
                    this.showLoadingMessage(false, '');
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 401:
                                this.showErrorMessage("Credenciales inválidas");
                                break;
                            case 404:
                                this.showErrorMessage("El usuario no existe");
                                break;
                            case 500:
                                this.showErrorMessage("Error en el servidor, intente más tarde");
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
            .subscribe((data:any) => {
                this.showLoadingMessage(false, '')
                this.userService.logout()
                this.showMessageSucces(data.message)
                this.router.navigate(['/']);
            })
        }
    }

    passwordMatchValidator(control: AbstractControl): any {
        const contrasena = control.get('new_password')?.value;
        const confirmarContrasena = control.get('conf_pass')?.value;

        if (contrasena !== confirmarContrasena) {
            control.get('conf_pass')?.setErrors({ noCoincide: true });
        } else {
            return null;
        }
    }

    showPasswordAct() {
        this.flagShowPassAct = !this.flagShowPassAct;
        if (this.flagShowPassAct) {
            this.inputTypePassAct = "text"
            this.iconButtonAct = "fa-regular fa-eye-slash"
        } else {
            this.inputTypePassAct = "password";
            this.iconButtonAct = "fa-regular fa-eye"
        }
    }

    showPassword() {
        this.flagShowPass = !this.flagShowPass;
        if (this.flagShowPass) {
            this.inputTypePass = "text"
            this.iconButton = "fa-regular fa-eye-slash"
        } else {
            this.inputTypePass = "password";
            this.iconButton = "fa-regular fa-eye"
        }
    }

    showPassword_conf() {
        this.flagShowPass_conf = !this.flagShowPass_conf;
        if (this.flagShowPass_conf) {
            this.inputTypePass_conf = "text"
            this.iconButton_conf = "fa-regular fa-eye-slash"
        } else {
            this.inputTypePass_conf = "password";
            this.iconButton_conf = "fa-regular fa-eye"
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
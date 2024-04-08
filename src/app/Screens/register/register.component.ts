import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { RegistrarUsuario } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegistro: FormGroup;
  flagShowPass: boolean = false;
  inputTypePass: string = "password";
  iconButton: string = "fa-regular fa-eye";
  flagShowPass_conf: boolean = false;
  inputTypePass_conf: string = "password";
  iconButton_conf: string = "fa-regular fa-eye";

  constructor(
    private form: FormBuilder,
    private user_service: UserServiceService,
    private router: Router
  ) {
    this.formRegistro = this.form.group({
      name: ['', [Validators.required]],
      firstSurname: ['', [Validators.required]],
      secondSurname: ['', [Validators.required]],
      telephone: ['', [Validators.required, this.validarNumeroTelefono]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_pass: ['', [Validators.required]],
      fecha_nacimiento: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  saveClient() {
    if (this.formRegistro.valid) {
      this.showLoadingMessage(true);
      const datosForm = this.formRegistro.value;
      delete datosForm.conf_pass;
      const usuario: RegistrarUsuario = datosForm
      usuario.id_rol = 1;

      this.user_service.saveClient(usuario)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.showLoadingMessage(false);
            if (error.status == 400) 
              this.showErrorMessage("Este correo electrónico ya esta registrado");            
            else if (error.status == 500 )
              this.showErrorMessage("Error en el servidor, intente más tarde");
            return "";
          })
        ).subscribe(
          (data) => {
            this.showLoadingMessage(false);
            this.showMessageSucces("Registro exitoso");
            this.router.navigate(["/"]);
        })
    }
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

  passwordMatchValidator(control: AbstractControl): any {
    const contrasena = control.get('password')?.value;
    const confirmarContrasena = control.get('conf_pass')?.value;

    if (contrasena !== confirmarContrasena) {
      control.get('conf_pass')?.setErrors({ noCoincide: true });
    } else {
      return null;
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
}

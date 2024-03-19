import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { loginUsuario, infoLogin } from 'src/app/Models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  flagShowPass: boolean;
  inputTypePass: string = "password";
  iconButton: string = "fa-regular fa-eye";

  constructor(
    private form: FormBuilder,
    private user_service: UserServiceService,
    private router: Router
  ) {
    this.flagShowPass = false;
    this.formLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formLogin.valid) {
      const datosForm = this.formLogin.value;
      const cliente: loginUsuario = datosForm

      this.user_service.login(cliente)
        .pipe(
          catchError((error) => {
            this.showLoadingMessage(false);
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
        ).subscribe(
          (data: infoLogin) => {
            this.user_service.setToken(data.token);
            this.router.navigate(['dash-board']);
          })
    }
  }

  async recoveryPassword() {
    const { value: userEmail } = await Swal.fire({
      title: "Ingresa tu email",
      input: "email",
      inputPlaceholder: "ejemplo@ejemplo.com",
      validationMessage: "Email inválido",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Enviar correo",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#6E1300"
    });
    if (userEmail) {
      this.showLoadingMessage(true);
      const email = {
        'email': userEmail
      }
      this.user_service.sendEmail(email).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false);
          switch(error.status) {
            case 404:
              this.showErrorMessage("El email no está registrado");
              break;
            case 500: 
              this.showErrorMessage("Error de conexión"); 
              break;
            default:
              this.showErrorMessage("Error inesperado");
              console.log(error)
          }           
          return "";
        })
      ).subscribe(
        (data: any) => {
          this.showLoadingMessage(false);
          setTimeout(() => { }, 100);
          this.showMessageSucces('Correo enviado a ' + email.email);
        })
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
        title: 'Enviando correo',
        didOpen: () => {
          Swal.disableButtons();
          Swal.showLoading(Swal.getConfirmButton());
        }
      });
    }
  }
}

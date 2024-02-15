import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registrarUsuario } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegistro: FormGroup;
  error: string = "Un error";

  constructor(
      private form: FormBuilder,
      private user_service: UserServiceService,
      private router: Router
  ){
    this.formRegistro = this.form.group({
      name: ['', [Validators.required]],
      firstSurname: ['', [Validators.required]],
      secondSurname: ['', [Validators.required]],
      telephone: ['', [Validators.required, this.validarNumeroTelefono]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_pass: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  saveClient(){
    if(this.formRegistro.valid) {
      const datosForm = this.formRegistro.value;
      delete datosForm.conf_pass;
      const usuario: registrarUsuario = datosForm
      usuario.id_rol = 1;

      this.user_service.saveClient(usuario).subscribe(
        (data) => {
          this.showMessageSucces("Registro exitoso");
          this.router.navigate(["/"]);
        },
        (error) => {
          this.showErrorMessage();
        }
      )
    }
  }

  //Errores de validación
  validarNumeroTelefono(control: { value: string; }) {
    const telefonoRegex = /^([0-9]{10})?$/; 
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

  showMessageSucces(message: String){
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showErrorMessage(){
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
    })
  }
}

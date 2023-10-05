import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { loginCliente } from 'src/app/Models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  error: string = "Un error";

  constructor(
      private form: FormBuilder,
      private user_service: UserServiceService,
  ){
    this.formLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  
  login() {
    if(this.formLogin.valid) {
      const datosForm = this.formLogin.value;
      const cliente: loginCliente = datosForm

      this.user_service.login(cliente).subscribe(
        (data: any) => {
          this.showMessageSucces("Ieeessss");
          this.user_service.setToken(data.token);
        },
        (error) => {
          this.showErrorMessage();
        }
      )
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

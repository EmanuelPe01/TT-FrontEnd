import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { loginUsuario, infoLogin } from 'src/app/Models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  formRecoveryPass: FormGroup;

  constructor(
      private form: FormBuilder,
      private user_service: UserServiceService,
      private router: Router
  ){
    this.formLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.formRecoveryPass = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  login(){
    if(this.formLogin.valid) {
      const datosForm = this.formLogin.value;
      const cliente: loginUsuario = datosForm

      this.user_service.login(cliente).subscribe(
        (data: infoLogin) => {
          this.showMessageSucces("Sesion iniciada como " + data.user.rol.rol_name);
          this.user_service.setToken(data.token);
          this.router.navigate(['dashboard']);
        },
        (error) => {
          
        }
      )
    }
  }

  sendEmail() {
    if(this.formRecoveryPass.valid) {
      this.showLoadingMessage(true);
      const button = document.getElementById('cerrarModalButton'); 
      const datosForm = this.formRecoveryPass.value;
      const email = {
        'email': datosForm.email
      }

      this.user_service.sendEmail(email).subscribe(
        (data:any) => {
          this.showLoadingMessage(false);
          setTimeout(() => {}, 100);
          this.showMessageSucces('El correo se a enviado correctamente a ' + email.email);
          if(button) button.setAttribute('data-bs-dismiss', 'modal');
          
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  showMessageSucces(message: string){
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

  showLoadingMessage(flag: boolean) {
    if (flag) {
      Swal.fire({
        title: 'Enviando correo',
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }
  }
}

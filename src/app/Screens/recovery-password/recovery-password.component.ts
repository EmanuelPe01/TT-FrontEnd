import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  formRestorePassword: FormGroup;
  recoveryPassToken: string = "";

  constructor(
    private activatedRute: ActivatedRoute,
    private route: Router,
    private userService: UserServiceService,
    private form: FormBuilder, 
  ) { 
    this.formRestorePassword = this.form.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_pass: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }


  ngOnInit() {
    const recoveryPassToken = this.activatedRute.snapshot.paramMap.get('token');
    if (recoveryPassToken) {
      this.recoveryPassToken = recoveryPassToken;
      this.userService.validateRecoveryToken(recoveryPassToken).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.log('El recurso no se encuentra');
          } else {
            console.error('Ocurrió un error:', error.error.message);
          }
          this.route.navigate(['/']);
          return "";
        })
      ).subscribe();
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

  restorePassword() {
    if(this.formRestorePassword.valid) {
      const password = {
        'password': this.formRestorePassword.get("password")?.value
      }

      this.userService.restorePassword(this.recoveryPassToken, password)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            this.showErrorMessage();
            return "";
        })        
      ).subscribe(
        (data:any) => {
          this.showMessageSucces("Contraseña almacenada correctamente");
          this.route.navigate(['/']);
        }
      );
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
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { infoBasicaUsuario } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/Incripcion/incripcion.service';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-inscripcion',
  templateUrl: './nueva-inscripcion.component.html',
  styleUrls: ['./nueva-inscripcion.component.css']
})
export class NuevaInscripcionComponent {

  formRegistro: FormGroup;
  isLoading: boolean = true
  usersCliente: infoBasicaUsuario[] | undefined
  usersEntrenador: infoBasicaUsuario[] | undefined
  valueCliente: String = ''
  valueEntrenador: String = ''

  criterio_c_nombre: string = ''
  criterio_c_p_a: string = ''
  criterio_c_s_a: string = ''
  criterio_e_nombre: string = ''
  criterio_e_p_a: string = ''
  criterio_e_s_a: string = ''

  constructor (
    private form: FormBuilder,
    private userService: UserServiceService,
    private inscriptionService: IncripcionService,
    private router: Router
  ) {
    this.formRegistro = this.form.group({
      id_user_cliente: ['', Validators.required],
      id_user_entrenador: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      peso_maximo: ['20', Validators.required],
      estado: ['1', Validators.required]
    })
  }

  async ngOnInit(){
    this.usersCliente = await this.userService.getUserByRole(1).toPromise()
                        .then((data: any) =>{
                          return data.usuarios;
                        }).catch((data) => {return undefined})

    this.usersEntrenador = await this.userService.getUserByRole(2).toPromise()
                        .then((data: any) =>{
                          return data.usuarios;
                        }).catch((data) => {return undefined})              
    this.isLoading = false;
  }

  filterUsers(users: infoBasicaUsuario[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): infoBasicaUsuario[] {
    if(users) {
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(nombre.toLowerCase()) &&
          user.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          user.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase())
      );
    } else {
      return [];
    }
  }

  setCliente(cliente: infoBasicaUsuario) {
    if (cliente) {
      this.formRegistro.patchValue({
        id_user_cliente: cliente.id
      });
      this.valueCliente = cliente.name + ' ' + cliente.firstSurname + ' ' + cliente.secondSurname;
      this.setInputReadOnly('input-cliente', true);
    }    
  }

  setEntrenador(entrenador: infoBasicaUsuario) {
    if (entrenador) {
      this.formRegistro.patchValue({
        id_user_entrenador: entrenador.id
      });
      this.valueEntrenador = entrenador.name + ' ' + entrenador.firstSurname + ' ' + entrenador.secondSurname
      this.setInputReadOnly('input-entrendador', true);
    } 
  }

  resetUser(rol: number) {
    if(rol === 1) {
      this.formRegistro.patchValue({
        id_user_cliente: null
      });
      this.setInputReadOnly('input-cliente', false);
      this.valueCliente = '';
    } else {
      this.formRegistro.patchValue({
        id_user_entrenador: null
      });
      this.setInputReadOnly('input-entrendador', false);
      this.valueEntrenador = '';
    }
  }

  saveInscription() {
    if(this.formRegistro.valid) {
      this.showLoadingMessage(true);
      this.inscriptionService.saveInscription(this.formRegistro.value).
      pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false);
          if (error.status == 400) 
            this.showErrorMessage("El usuario ya está registrado");            
          else if (error.status == 500 )
            this.showErrorMessage("Error en la base de datos");

          console.log(error)
          return "";
        })
      ).subscribe((data) => {
        this.showLoadingMessage(false);
        this.showMessageSucces("Registro exitoso");
        this.router.navigate(["dash-board/admin/inscripciones"]);
      });
    }
  }

  setInputReadOnly(id: string, flag: boolean) {
    const inputCliente = document.getElementById(id) as HTMLInputElement;
    inputCliente.readOnly = flag;
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
          Swal.showLoading();
        }
      });
    }
  }
}

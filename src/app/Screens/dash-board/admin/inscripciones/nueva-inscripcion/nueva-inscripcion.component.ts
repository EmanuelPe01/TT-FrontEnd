import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { InfoBasicaUsuario } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/incripcion.service';
import { UserServiceService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-inscripcion',
  templateUrl: './nueva-inscripcion.component.html',
  styleUrls: ['./nueva-inscripcion.component.css']
})
export class NuevaInscripcionComponent {

  formRegistro: FormGroup;
  isLoading: boolean = true
  usersCliente: InfoBasicaUsuario[] | undefined
  usersEntrenador: InfoBasicaUsuario[] | undefined
  valueCliente: string = ''
  valueEntrenador: string = ''
  criterio_c_nombre: string = ''
  criterio_e_nombre: string = ''
  isFocused: boolean = false;
  inputFecha: string = 'text'

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
      peso_maximo: ['', Validators.required],
      estado: ['1', Validators.required]
    })
  }

  async ngOnInit(){
    this.userService.getUserByRole(1).
    pipe().
    subscribe((data) => {
      this.usersCliente = data;
      this.userService.getUserByRole(2).
      pipe().
      subscribe((data) => {
        this.usersEntrenador = data;
        this.isLoading = false;
      });
    });
  }

  filterUsers(users: InfoBasicaUsuario[] | undefined, nombre: string): InfoBasicaUsuario[] {
    if((nombre.length >= 3) && users) {
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(nombre.toLowerCase()) ||
          user.firstSurname.toLowerCase().includes(nombre.toLowerCase()) ||
          user.secondSurname.toLowerCase().includes(nombre.toLowerCase())
      );
    } else if(users) {
       return users;
    }
    return [];
  }

  setCliente(cliente: InfoBasicaUsuario) {
    if (cliente) {
      this.formRegistro.patchValue({
        id_user_cliente: cliente.id
      });
      this.valueCliente = cliente.name + ' ' + cliente.firstSurname + ' ' + cliente.secondSurname;
      this.setInputReadOnly('input-cliente', true);
    }    
  }

  setEntrenador(entrenador: InfoBasicaUsuario) {
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
          return "";
        })
      ).subscribe((data) => {
        this.showLoadingMessage(false);
        this.showMessageSucces("Registro exitoso");
        this.router.navigate(["dash-board/admin/inscripciones"]);
      });
    }
  }

  onBlur(){
    const fecha = this.formRegistro.get('fecha_inicio')?.value
    fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'     
  }

  onFocus() {
    this.inputFecha = 'date'
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
          Swal.disableButtons();
          Swal.showLoading();
        }
      });
    }
  }
}

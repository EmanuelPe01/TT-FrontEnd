import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncripcionService } from 'src/app/Services/incripcion.service';
import { InfoBasicaUsuario, SingleInscription } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrls: ['./editar-inscripcion.component.css']
})
export class EditarInscripcionComponent {
  formRegistro: FormGroup
  isLoading: boolean = true
  detalleInscripcion: SingleInscription | undefined
  usersEntrenador: InfoBasicaUsuario[] = []
  idInscripcion: number = 0
  nameCliente: string = ""
  nameEntrenador: string = ""
  criterio_e_nombre: string = ""

  constructor(
    private form: FormBuilder,
    private inscriptionService: IncripcionService,
    private userService: UserServiceService,
    private activatedRute: ActivatedRoute,
    private router: Router
  ) {
    this.formRegistro = this.form.group({
      id_user_cliente: ['', Validators.required],
      id_user_entrenador: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      peso_maximo: ['', Validators.required],
      estado: ['', Validators.required]
    })
    this.idInscripcion = Number(this.activatedRute.snapshot.paramMap.get('idInscripcion'));
  }

  ngOnInit() {
    this.inscriptionService.getInscripcionById(this.idInscripcion).
      pipe().
      subscribe((data) => {
        this.detalleInscripcion = data;
        this.formRegistro.patchValue({
          id_user_cliente: data.id_user_cliente,
          id_user_entrenador: data.id_user_entrenador,
          fecha_inicio: data.fecha_inicio,
          peso_maximo: data.peso_maximo,
          estado: data.estado
        })
        this.userService.getUserByRole(2).
          pipe().
          subscribe((data) => {
            this.usersEntrenador = data;
            this.isLoading = false;
          })
        this.nameCliente = `${data.cliente.name} ${data.cliente.firstSurname} ${data.cliente.secondSurname}`;
        this.nameEntrenador = `${data.entrenador.name} ${data.entrenador.firstSurname} ${data.entrenador.secondSurname}`;
      })
  }

  cuentaActiva() {
    return Number(this.formRegistro.get('estado')?.value) == 1
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

  setEntrenador(entrenador: InfoBasicaUsuario) {
    if (entrenador) {
      this.formRegistro.patchValue({
        id_user_entrenador: entrenador.id
      });
      this.setInputReadOnly('input-entrenador', true);
      this.nameEntrenador = entrenador.name + ' ' + entrenador.firstSurname + ' ' + entrenador.secondSurname
    } 
  }

  resetUser() {
      this.formRegistro.patchValue({
        id_user_entrenador: null
      });
      this.setInputReadOnly('input-entrenador', false);
      this.nameEntrenador = '';
  }

  setInputReadOnly(id: string, flag: boolean) {
    const inputCliente = document.getElementById(id) as HTMLInputElement;
    inputCliente.readOnly = flag;
  }

  saveInscription() {
      if(this.formRegistro.valid){
        this.showLoadingMessage(true);
        const inscripcion: SingleInscription = this.formRegistro.value
        this.inscriptionService.updateInscripcion(inscripcion, this.idInscripcion).
        pipe().
        subscribe((data) => { 
          this.showLoadingMessage(false);
          this.showMessageSucces("Actualización exitosa");
          this.router.navigate(["dash-board/admin/inscripciones"]);
        })
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
        title: 'Actualizando información',
        didOpen: () => {
          Swal.disableButtons();
          Swal.showLoading();
        }
      });
    }
  }

}

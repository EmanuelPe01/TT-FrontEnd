import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { infoBasicaUsuario } from 'src/app/Models';
import { UserServiceService } from 'src/app/Services/User/user-service.service';

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
    private userService: UserServiceService
  ) {
    this.formRegistro = this.form.group({
      id_user_cliente: ['', Validators.required],
      id_user_entrenador: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      peso_maximo: ['20', Validators.required],
      estado: ['', Validators.required]
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
      this.deshabilitarInput('input-cliente');
    }    
  }

  setEntrenador(entrenador: infoBasicaUsuario) {
    if (entrenador) {
      this.formRegistro.patchValue({
        id_user_cliente: entrenador.id
      });
      this.valueEntrenador = entrenador.name + ' ' + entrenador.firstSurname + ' ' + entrenador.secondSurname
      this.deshabilitarInput('input-entrendador');
    } 
  }

  deshabilitarInput(id: string) {
    const inputCliente = document.getElementById(id) as HTMLInputElement;
    inputCliente.readOnly = true;
  }

  saveInscription() {

  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.formRegistro = this.form.group([
      
    ])
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

  filterCliente(clientes: infoBasicaUsuario[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): infoBasicaUsuario[] {
    if(clientes) {
      return clientes.filter(
        (cliente) =>
          cliente.name.toLowerCase().includes(nombre.toLowerCase()) &&
          cliente.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          cliente.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase())
      );
    } else {
      return [];
    }
  }

  filterEntrenador(entrenadores: infoBasicaUsuario[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): infoBasicaUsuario[] {
    if(entrenadores) {
      return entrenadores.filter(
        (entrenador) =>
          entrenador.name.toLowerCase().includes(nombre.toLowerCase()) &&
          entrenador.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          entrenador.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase())
      );
    } else {
      return [];
    }
  }

  saveInscription() {

  }
}

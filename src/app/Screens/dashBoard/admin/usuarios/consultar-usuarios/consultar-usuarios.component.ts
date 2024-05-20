import { Component } from '@angular/core';
import { InformacionUsuario } from 'src/app/Models';
import { Rol } from 'src/app/Models/ModelRol';
import { UserServiceService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.css']
})
export class ConsultarUsuariosComponent {
  isLoading: boolean = true
  criterio_nombre: string = ''
  criterio_p_a: string = ''
  criterio_s_a: string = ''
  criterioRol: string = ''
  listUsers: InformacionUsuario[] = []
  listRoles: Rol[] = []

  constructor( 
    private userService: UserServiceService
  ){}

  ngOnInit() {
    this.getAllRoles()
  }

  getAllUsers() {
    this.userService.getAllUsers().pipe()
    .subscribe((data: InformacionUsuario[]) => {
      console.log(data)
      this.listUsers = data
      this.isLoading = false
    })
  }

  getAllRoles() {
    this.userService.getAllRoles().pipe()
    .subscribe((data: Rol[]) => {
      this.listRoles = data
      this.getAllUsers()
    })
  }

  filterInscripciones(listUsers: InformacionUsuario[] | undefined, nombre: string, primerApellido: string, segundoApellido: string, rol: string): InformacionUsuario[] {
    if( (nombre.length >=3 || primerApellido.length >= 3  || segundoApellido.length >= 3 || rol) && listUsers) {
      return listUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(nombre.toLowerCase()) &&
          user.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          user.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase()) &&
          user.rol.id.toString().includes(rol)
      );
    } else if(listUsers){
      return listUsers;
    }
    return [];
  }

  limpiarForm() {
    this.criterio_nombre = ''
    this.criterio_p_a = ''
    this.criterio_s_a = ''
    this.criterioRol = ''
  }
}

import { Component } from '@angular/core';
import { InformacionUsuario } from 'src/app/Models';
import { Rol } from 'src/app/Models/ModelRol';
import { UserServiceService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

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

  deleteUser(nombreUsuario: string, iduser: number){
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se eliminará toda la información de ${nombreUsuario} (inscripción, rutinas, etc...)` ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6E1300",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoadingMessage(true, 'Eliminando');
        this.userService.deleteUser(iduser).
        pipe().
        subscribe((data) => {
          this.showLoadingMessage(false, '');
          this.showMessageSucces('Registro eliminado');
          this.getAllUsers();
        })
      }
    });
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

  showLoadingMessage(flag: boolean, title: string) {
    if (flag) {
      Swal.fire({
        title: title,
        didOpen: () => {
          Swal.disableButtons()
          Swal.showLoading()
        }
      })
    }
  }
}

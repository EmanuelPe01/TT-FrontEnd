import { Component } from '@angular/core';
import { SingleInscription } from 'src/app/Models/ModelInscription';
import { IncripcionService } from 'src/app/Services/Incripcion/incripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-inscripciones',
  templateUrl: './consulta-inscripciones.component.html',
  styleUrls: ['./consulta-inscripciones.component.css']
})
export class ConsultaInscripcionesComponent {

  inscripciones: SingleInscription[] | undefined
  isLoading: boolean = true

  criterio_nombre: string = ''
  criterio_p_a: string = ''
  criterio_s_a: string = ''
  

  constructor (
    private inscripcionService: IncripcionService,
  ) {
   }

  ngOnInit(){
    this.getInscriptions();
  }

  getInscriptions() {
    this.inscripcionService.getAllInscriptions().
    pipe().
    subscribe((data: SingleInscription[]) => {
      this.inscripciones = data;
      this.isLoading = false;
    })
  }

  filterInscripciones(inscripciones: SingleInscription[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): SingleInscription[] {
    if( (nombre.length >=3 || primerApellido.length >= 3  || segundoApellido.length >= 3 ) && inscripciones) {
      return inscripciones.filter(
        (inscripcion) =>
          inscripcion.cliente.name.toLowerCase().includes(nombre.toLowerCase()) &&
          inscripcion.cliente.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          inscripcion.cliente.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase())
      );
    } else if(inscripciones){
      return inscripciones;
    }
    return [];
  }

  deleteInscription(nameCliente: string, id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se eliminará la inscripción de ${nameCliente}` ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6E1300",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoadingMessage(true);
        this.inscripcionService.deleteInsctiption(id).
        pipe().
        subscribe((data) => {
          this.showLoadingMessage(false);
          this.showMessageSucces('Registro eliminado');
          this.getInscriptions()
        })
      }
    });
  }

  showMessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showLoadingMessage(flag: boolean) {
    if (flag) {
      Swal.fire({
        title: 'Espera un momento',
        didOpen: () => {
          Swal.disableButtons();
          Swal.showLoading(Swal.getConfirmButton());
        }
      });
    }
  }
}

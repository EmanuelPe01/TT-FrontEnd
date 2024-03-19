import { Component } from '@angular/core';
import { inscripciones, singleInscription } from 'src/app/Models/ModelInscription';
import { IncripcionService } from 'src/app/Services/Incripcion/incripcion.service';

@Component({
  selector: 'app-consulta-inscripciones',
  templateUrl: './consulta-inscripciones.component.html',
  styleUrls: ['./consulta-inscripciones.component.css']
})
export class ConsultaInscripcionesComponent {

  inscripciones: singleInscription[] | undefined
  isLoading: boolean = true

  criterio_nombre: string = ''
  criterio_p_a: string = ''
  criterio_s_a: string = ''
  

  constructor (
    private inscripcionService: IncripcionService,
  ) {
   }

  ngOnInit(){
    this.inscripcionService.getAllInscriptions().
    pipe().
    subscribe((data: inscripciones) => {
      this.inscripciones = data.inscripciones;
      this.isLoading = false;
    })
  }

  filterInscripciones(inscripciones: singleInscription[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): singleInscription[] {
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
}

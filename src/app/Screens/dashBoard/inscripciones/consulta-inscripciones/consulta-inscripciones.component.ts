import { Component } from '@angular/core';
import { singleInscription } from 'src/app/Models/ModelInscription';
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

  async ngOnInit(){
    this.inscripciones = await this.inscripcionService.getAllInscriptions().toPromise()
                          .then((data: any) => {
                            return data.inscripciones
                          }).catch((data) => {return undefined})                  
    this.isLoading = false;
  }

  filterInscripciones(inscripciones: singleInscription[] | undefined, nombre: string, primerApellido: string, segundoApellido: string): singleInscription[] {
    if(inscripciones) {
      return inscripciones.filter(
        (inscripcion) =>
          inscripcion.cliente.name.toLowerCase().includes(nombre.toLowerCase()) &&
          inscripcion.cliente.firstSurname.toLowerCase().includes(primerApellido.toLowerCase()) &&
          inscripcion.cliente.secondSurname.toLowerCase().includes(segundoApellido.toLowerCase())
      );
    } else {
      return [];
    }
  }
}

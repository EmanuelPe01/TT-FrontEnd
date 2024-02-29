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

  constructor (
    private inscripcionService: IncripcionService
  ) { }

  async ngOnInit(){
    this.inscripciones = await this.inscripcionService.getAllInscriptions().toPromise()
                          .then((data: any) => {
                            return data.inscripciones
                          }).catch((data) => {return undefined})

    this.isLoading = false;
  }
}

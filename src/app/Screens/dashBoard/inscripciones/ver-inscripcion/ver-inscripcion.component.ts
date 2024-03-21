import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleInscription } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/Incripcion/incripcion.service';

@Component({
  selector: 'app-ver-inscripcion',
  templateUrl: './ver-inscripcion.component.html',
  styleUrls: ['./ver-inscripcion.component.css']
})
export class VerInscripcionComponent {
  detalleInscripcion: SingleInscription | undefined
  idInscripcion: number = 0
  isLoading: boolean = true
  nameCliente: string = ""
  nameEntrenador: string = ""
  estado: string = ""

  constructor(
    private inscriptionService: IncripcionService,
    private activatedRute: ActivatedRoute,
  ) {
    this.idInscripcion = Number(this.activatedRute.snapshot.paramMap.get('idInscripcion'));
  }

  ngOnInit() {
    this.inscriptionService.getInscripcionById(this.idInscripcion).
    pipe().
    subscribe((data: SingleInscription) => {
      this.detalleInscripcion = data;
      this.nameCliente = this.detalleInscripcion.cliente.name + ' ' + this.detalleInscripcion.cliente.firstSurname + ' ' + this.detalleInscripcion.cliente.secondSurname
      this.nameEntrenador = this.detalleInscripcion.entrenador.name + ' ' + this.detalleInscripcion.entrenador.firstSurname + ' ' + this.detalleInscripcion.entrenador.secondSurname 
      this.estado = (this.detalleInscripcion.estado == '1') ? 'Activo' : 'Inactivo'
      this.isLoading = false
    })
  }
}

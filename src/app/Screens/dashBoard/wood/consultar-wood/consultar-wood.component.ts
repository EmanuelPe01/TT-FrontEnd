import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InscripcionesActivas } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/incripcion.service';

@Component({
  selector: 'app-consultar-wood',
  templateUrl: './consultar-wood.component.html',
  styleUrls: ['./consultar-wood.component.css']
})
export class ConsultarWoodComponent {
  criterioCliente: string = ''
  formBusquedaWoods: FormGroup;
  minDate: string = '';
  maxDate: string = '';
  agregarRutina: boolean = true
  id_inscripcion: number = 0
  nombreCliente_inscripcion: string = ''
  pesoMaximo_inscripcion: string = ''
  inscripcionesActivas: InscripcionesActivas[] = []

  constructor(
    private form: FormBuilder,
    private inscripcionService: IncripcionService
  ) {
    this.initializeDates();
    this.getActiveInscription();
    this.formBusquedaWoods = this.form.group({
      id_inscripcion: ['', Validators.required],
      fecha_inicio: [this.minDate, Validators.required],
      fecha_fin: [this.maxDate, Validators.required]
    })
  }

  getActiveInscription() {
    this.inscripcionService.getActiveInscription().
    pipe().
    subscribe((data: InscripcionesActivas[]) => {
      this.inscripcionesActivas = data
    })
  }

  activarAgregar(event: Event) {
    const inscripcionSeleccionada = event.target as HTMLSelectElement
    if(!isNaN(Number(inscripcionSeleccionada.value))){
      const inscripcionInfo = this.inscripcionesActivas.find(insAct => insAct.id == Number(inscripcionSeleccionada.value))
      if(inscripcionInfo) {
        this.id_inscripcion = inscripcionInfo.id
        this.nombreCliente_inscripcion = inscripcionInfo.cliente.name + ' ' + inscripcionInfo.cliente.firstSurname + ' ' + inscripcionInfo.cliente.secondSurname
        this.pesoMaximo_inscripcion = inscripcionInfo.peso_maximo.toString()
        this.agregarRutina = false
      }
    }
    else 
      this.agregarRutina = true
  }

  initializeDates() {
    const today = moment();
    const sunday = today.clone().startOf('week').day(1); // Obtener el domingo de la semana actual
    const saturday = today.clone().startOf('week').day(6);

    this.minDate = sunday.format('YYYY-MM-DD');
    this.maxDate = saturday.format('YYYY-MM-DD');
  }

  filterInput(event: any) {
    const selectedDate = moment(event.target.value, 'YYYY-MM-DD', true);
    if (selectedDate.isValid()) {
      const previousMonday = selectedDate.clone().startOf('week').add(1, 'day');
      this.maxDate = selectedDate.clone().startOf('week').add(6, 'day').format('YYYY-MM-DD');
      event.target.value = previousMonday.format('YYYY-MM-DD');
      this.formBusquedaWoods.patchValue({
        fecha_fin: this.maxDate
      })
    }
  }

  changeTiposEjercicios(event: Event) {
    
  }

  consultarWoods() {
    console.log(this.formBusquedaWoods.value)
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { DetalleRutina, InscripcionesActivas, ResultadoRutina } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/incripcion.service';
import { RutinaService } from 'src/app/Services/rutina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-wood',
  templateUrl: './consultar-rutina.component.html',
  styleUrls: ['./consultar-rutina.component.css']
})
export class ConsultarRutinasComponent {
  criterioCliente: string = ''
  formBusquedaWoods: FormGroup;
  minDate: string = '';
  maxDate: string = '';
  agregarRutina: boolean = true
  showRutinas: boolean = false
  isLoading: boolean = true
  isLoadingResult: boolean = true
  id_inscripcion: number = 0
  nombreCliente_inscripcion: string = ''
  pesoMaximo_inscripcion: string = ''
  inscripcionesActivas: InscripcionesActivas[] = []
  rutinas: DetalleRutina[] = []
  notEmptyRutinas: boolean = true
  resultadoRutina: ResultadoRutina | undefined

  constructor(
    private form: FormBuilder,
    private inscripcionService: IncripcionService,
    private rutinaService: RutinaService,
  ) {
    this.initializeDates();
    this.getActiveInscription();
    this.formBusquedaWoods = this.form.group({
      id_inscripcion: ['', Validators.required],
      fecha_inicio: [this.minDate, Validators.required],
      fecha_fin: [this.maxDate, Validators.required],
      halterofilia: [false, Validators.required]
    })
  }

  getActiveInscription() {
    this.inscripcionService.getActiveInscription().
    pipe().
    subscribe((data: InscripcionesActivas[]) => {
      this.inscripcionesActivas = data
    })
  }

  getResultadoRutina(idRutina: number) {
    this.rutinaService.getResultadoRutina(idRutina).
    pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404){
          this.isLoadingResult = false
          this.resultadoRutina = undefined
        }
        else if (error.status == 500)
          this.showErrorMessage("Error en el servidor, intente más tarde");
        return ""
      })
    ).subscribe((data: ResultadoRutina | any) => {
      this.resultadoRutina = data;
      setTimeout(() => { }, 200)
      this.isLoadingResult = false
    })
  } 

  changeFlag() {
    this.isLoadingResult = true
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
    const checkHalterfilia = event.target as HTMLInputElement
    this.formBusquedaWoods.patchValue({
      halterofilia: checkHalterfilia.checked
    })
  }

  consultarWoods() {
    this.showRutinas = true
    this.isLoading = true
    if(this.formBusquedaWoods.valid){
      this.rutinaService.consultRutina(this.formBusquedaWoods.value).
      pipe().
      subscribe((data: DetalleRutina[]) => {
        this.rutinas = data
        this.isLoading = false
        if(this.rutinas.length == 0)
          this.notEmptyRutinas = false
        else 
          this.notEmptyRutinas = true
      })
    }
  }

  deleteRutina(diaRutina: string, id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se eliminará la rutina del ${diaRutina}` ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6E1300",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoadingMessage(true);
        this.rutinaService.deleteRutina(id).
        pipe().
        subscribe((data) => {
          this.showLoadingMessage(false);
          this.showMessageSucces('Registro eliminado');
          this.consultarWoods()
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

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonColor: "#000",
      confirmButtonText: "Aceptar",
    })
  }

  showLoadingMessage(flag: boolean) {
    if (flag) {
      Swal.fire({
        title: 'Espera un momento',
        didOpen: () => {
          Swal.disableButtons();
          Swal.showLoading();
        }
      });
    }
  }

}

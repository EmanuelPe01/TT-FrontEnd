import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { InscripcionesActivas, DetalleRutina, ResultadoRutina, InfoLogin, DetailInscription } from 'src/app/Models';
import { IncripcionService } from 'src/app/Services/incripcion.service';
import { RutinaService } from 'src/app/Services/rutina.service';
import { UserServiceService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-rutinas',
  templateUrl: './consultar-rutinas.component.html',
  styleUrls: ['./consultar-rutinas.component.css']
})
export class ConsultarRutinasCustomerComponent {
  formBusquedaWoods: FormGroup;
  minDate: string = '';
  maxDate: string = '';
  showRutinas: boolean = false
  isLoading: boolean = true
  isLoadingResult: boolean = true
  rutinas: DetalleRutina[] = []
  notEmptyRutinas: boolean = true
  resultadoRutina: ResultadoRutina | undefined

  constructor(
    private form: FormBuilder,
    private userService: UserServiceService,
    private rutinaService: RutinaService,
  ) {
    this.initializeDates();
    this.formBusquedaWoods = this.form.group({
      id_inscripcion: ['', Validators.required],
      fecha_inicio: [this.minDate, Validators.required],
      fecha_fin: [this.maxDate, Validators.required],
      halterofilia: [false, Validators.required]
    })
  }

  ngOnInit() {
    this.checkStatus()
  }

  checkStatus() {
    this.userService.detailInscription().pipe().subscribe((data: DetailInscription) => {
      this.formBusquedaWoods.patchValue({
        id_inscripcion: data.detalle.id
      })
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
    ).
    subscribe((data: ResultadoRutina | any) => {
      this.resultadoRutina = data;
      setTimeout(() => { }, 200)
      this.isLoadingResult = false
    })
  } 

  changeFlag() {
    this.isLoadingResult = true
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

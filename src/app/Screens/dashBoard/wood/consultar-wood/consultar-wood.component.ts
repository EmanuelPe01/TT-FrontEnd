import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

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

  constructor(
    private form: FormBuilder,
  ) {
    this.initializeDates();
    this.formBusquedaWoods = this.form.group({
      id_user_cliente: ['', Validators.required],
      fecha_inicio: [this.minDate, Validators.required],
      fecha_fin: [this.maxDate, Validators.required]
    })
  }

  initializeDates() {
    const today = moment();
    const sunday = today.clone().startOf('week'); // Obtener el domingo de la semana actual
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

  consultarWoods() {
    console.log(this.formBusquedaWoods.value)
  }

}

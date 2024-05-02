import { Component} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'bootstrap'
import * as moment from "moment";
import { tipoEjercicio } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";

@Component({
    selector: 'nuevo-wood',
    templateUrl: './nuevo-wood.component.html',
    styleUrls: ['./nuevo-wood.component.css']
})

export class NuevoWoodComponent {
    minDate: string = '';
    inputFecha: string = 'text';
    formRutina: FormGroup;
    tiposEjercicio: tipoEjercicio[] = [];

    constructor(
        private form: FormBuilder,
        private ejercicioService: EjercicioService,
    ) {
        this.formRutina = this.form.group({
            fecha_rutina: ['', Validators.required],
        })
    }

    ngOnInit() {
        this.getTiposEjercicio();
        this.initializeDates();
    }

    getTiposEjercicio() {
        this.ejercicioService.getAllTiposEjercicio().
          pipe().
          subscribe((data: tipoEjercicio[]) => {
            this.tiposEjercicio = data
          })
    }

    initializeDates() {
        const today = moment();
        const sunday = today.clone().startOf('week');
        this.minDate = sunday.format('YYYY-MM-DD');
    }

    onBlur() {
        const fecha = this.formRutina.get('fecha_rutina')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
    }
}
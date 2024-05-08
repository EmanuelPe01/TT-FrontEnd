import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { parse } from "date-fns";
import * as moment from "moment";
import { DetalleRutina, tipoEjercicio, ejercicioRutina } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import Swal from "sweetalert2";

@Component({
    selector: 'modificar-rutina',
    templateUrl: './modificar-rutina.component.html',
    styleUrls: ['./modificar-rutina.component.css']
})

export class ModificarRutinaComponent {
    rutina: DetalleRutina | undefined
    nombreCliente: string = '';
    pesoMaximo: number = 0;
    minDate: string = '';
    inputFecha: string = 'text';
    formRutina: FormGroup;
    formEjercicio: FormGroup;
    tiposEjercicio: tipoEjercicio[] = [];
    tipoHalterofilia: tipoEjercicio | undefined
    tipoEjercicio: string = '';
    unidadMedida: string = 'Cantidad';
    onlyHalterofilia: boolean = false;
    detalleEjercicios: any[] = [];
    unidadPeso: string = 'lb'
    ejerciciosRutina: ejercicioRutina[] = []


    constructor(
        private route: ActivatedRoute,
        private form: FormBuilder,
        private ejercicioService: EjercicioService
    ) {
        this.formRutina = this.form.group({
            fecha_rutina: ['', Validators.required],
            rondas: ['', Validators.required],
            tiempo: ['', Validators.required],
            peso: ['', Validators.required],
            halterofilia: [false, Validators.required],
            ejercicios: [Validators.required]
        })
        this.formEjercicio = this.form.group({
            id_tipo_ejercicio: ['', Validators.required],
            id_ejercicio: ['', Validators.required],
            cantidad_ejercicio: ['', Validators.required]
        })
    }

    ngOnInit() {
        this.initializeDates()
        this.getTiposEjercicio()
        const objetoString = this.route.snapshot.paramMap.get('objeto');
        if (objetoString) this.rutina = JSON.parse(objetoString)
    }

    saveRutina() {

    }

    modificarEjercicio(ejercicio: ejercicioRutina) {

    }

    eliminarEjercicioRutina(ejercicio: ejercicioRutina) {

    }

    setFormRutina() {
        if (this.rutina) {
            const ejercicios = this.rutina.detalle_rutina
            const fechaNormal:string = this.rutina.fecha_rutina.toString()
            const fechaConvertida = this.convertirFecha(fechaNormal)
            
            ejercicios?.forEach((ejercicio) => {
                const tipoEjercicio = this.tiposEjercicio.find((tEjercicio) => tEjercicio.id == ejercicio.detalle_ejercicio.id_tipo_ejercicio)
                const ejercicioRutina: ejercicioRutina = {
                    id: ejercicio.id,
                    id_tipo_ejercicio: ejercicio.detalle_ejercicio.id_tipo_ejercicio,
                    nombre_tEjercicio: tipoEjercicio?.nombre_tipo,
                    id_ejercicio: ejercicio.detalle_ejercicio.id,
                    nombre_ejercicio: ejercicio.detalle_ejercicio.nombre_ejercicio,
                    cantidad_ejercicio: ejercicio.cantidad_ejercicio,
                    unidad_medida: ejercicio.detalle_ejercicio.unidad_medida,
                }
                this.ejerciciosRutina.push(ejercicioRutina)
            })
            this.formRutina.patchValue({
                fecha_rutina: fechaConvertida,
                rondas: this.rutina.rondas,
                tiempo: this.rutina.tiempo,
                peso: this.rutina.peso,
                halterofilia: this.rutina.halterofilia
            })
        }
    }

    convertirFecha(cadenaFecha: String) {
        const [, diaSemana, diaMes, mes] = cadenaFecha.split(' ');
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const mesNumero = meses.findIndex(m => m === mes) + 1;
        const fecha = new Date(`${mesNumero}/${diaSemana}/${new Date().getFullYear()}`);
        return fecha.toISOString().slice(0, 10);        
    }

    actualizarSeleccion(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.tipoEjercicio = selectElement.value;
        this.unidadMedida = 'Cantidad'
    }

    actualizarSeleccionEjercicio(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedId = Number(selectElement.value);
        const ejercicioSeleccionado = this.detalleEjercicios.find(ejercicio => ejercicio.id === selectedId);
        ejercicioSeleccionado ? this.unidadMedida = ejercicioSeleccionado.unidad_medida : this.unidadMedida = 'Cantidad'
    }

    changeTiposEjercicios(event: Event) {
        const checkHalterofilia = event.target as HTMLInputElement;
        if (!checkHalterofilia.checked) {
            this.onlyHalterofilia = false
            this.ejerciciosRutina = []
            this.tipoEjercicio = ''
            this.unidadMedida = 'Cantidad'
            this.unidadPeso = 'lb'
        } else {
            this.onlyHalterofilia = true
            const tipoHalterofilia = this.tiposEjercicio.find(tEjercicio => tEjercicio.nombre_tipo.toLowerCase() === "halterofilia")
            if (tipoHalterofilia) this.tipoEjercicio = tipoHalterofilia.id.toString()
            this.formEjercicio.patchValue({
                id_tipo_ejercicio: this.tipoEjercicio
            })
            this.ejerciciosRutina = []
            this.unidadMedida = 'Cantidad'
            this.unidadPeso = '%'
        }
    }

    addEjercicio() {
        const singleEjercicio: ejercicioRutina = this.formEjercicio.value
        const nombre_tEjercicio = this.tiposEjercicio.find(tEjercicio => tEjercicio.id == singleEjercicio.id_tipo_ejercicio)
        const nombre_ejercicio = this.detalleEjercicios.find(ejercicio => ejercicio.id == singleEjercicio.id_ejercicio)

        if (this.formEjercicio.valid && nombre_ejercicio && nombre_tEjercicio) {
            singleEjercicio.nombre_ejercicio = nombre_ejercicio.nombre_ejercicio
            singleEjercicio.nombre_tEjercicio = nombre_tEjercicio.nombre_tipo
            singleEjercicio.unidad_medida = this.unidadMedida
            this.ejerciciosRutina.push(singleEjercicio)
            this.formEjercicio.reset()
            if (this.onlyHalterofilia)
                this.formEjercicio.patchValue({
                    id_tipo_ejercicio: this.tipoEjercicio
                })
            console.log(this.ejerciciosRutina)
        }
    }

    filterEjercicios(detalleEjercicios: any[], tipoEjercicio: string) {
        if (tipoEjercicio) {
            detalleEjercicios = this.detalleEjercicios
            return detalleEjercicios.filter(
                (ejercicio: any) => ejercicio.id_tipo_ejercicio.toString().includes(tipoEjercicio)
            )
        } else {
            return []
        }
    }

    initializeDates() {
        const today = moment();
        const sunday = today.clone().startOf('week');
        this.minDate = sunday.format('YYYY-MM-DD');
    }

    getTiposEjercicio() {
        this.ejercicioService.getAllTiposEjercicio().
            pipe().
            subscribe((data: tipoEjercicio[]) => {
                this.tiposEjercicio = data
                this.getEjercicios()
                this.setFormRutina()
            })
    }

    getEjercicios() {
        this.ejercicioService.getInfoBasicEjercicios().
            pipe().
            subscribe((data: any[]) => {
                this.detalleEjercicios = data
            })
    }

    onBlur() {
        const fecha = this.formRutina.get('fecha_rutina')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
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
                title: 'Registrando',
                didOpen: () => {
                    Swal.disableButtons();
                    Swal.showLoading();
                }
            });
        }
    }
}
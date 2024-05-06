import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import 'bootstrap'
import * as moment from "moment";
import { catchError } from "rxjs";
import { rutinaGenerada, tipoEjercicio } from "src/app/Models";
import { ejercicioRutina } from "src/app/Models/ModelEjercicio";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import { RutinaService } from "src/app/Services/rutina.service";
import Swal from "sweetalert2";

@Component({
    selector: 'nuevo-wood',
    templateUrl: './nuevo-wood.component.html',
    styleUrls: ['./nuevo-wood.component.css']
})

export class NuevoWoodComponent {
    idInscripcion: number = 0
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
    ejerciciosRutina: ejercicioRutina[] = []

    constructor(
        private form: FormBuilder,
        private ejercicioService: EjercicioService,
        private rutinaService: RutinaService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams.subscribe(params => {
            this.idInscripcion = params['id'];
        });
        this.formRutina = this.form.group({
            id_inscripcion: [this.idInscripcion, Validators.required],
            fecha_rutina: ['', Validators.required],
            rondas: ['', Validators.required],
            tiempo: ['', Validators.required],
            peso: ['', Validators.required],
            halterofilia: [false, Validators.required],
            ejercicios: [this.ejerciciosRutina]
        })
        this.formEjercicio = this.form.group({
            id_tipo_ejercicio: ['', Validators.required],
            id_ejercicio: ['', Validators.required],
            cantidad_ejercicio: ['', Validators.required]
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
                this.getEjercicios()
            })
    }

    getEjercicios() {
        this.ejercicioService.getInfoBasicEjercicios().
            pipe().
            subscribe((data: any[]) => {
                this.detalleEjercicios = data
            })
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
        }
    }

    saveRutina() {
        if (this.formRutina.valid) {
            const rutinaNueva: rutinaGenerada = this.formRutina.value
            this.showLoadingMessage(true);
            this.rutinaService.saveRutina(rutinaNueva).
                pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.showLoadingMessage(false);
                        if (error.status == 400)
                            this.showErrorMessage("Error en la petición");
                        else if (error.status == 500)
                            this.showErrorMessage("Error en la base de datos");

                        console.log(error)
                        return "";
                    })
                ).
                subscribe((data: any) => {
                    this.showLoadingMessage(false);
                    this.showMessageSucces("Registro exitoso");
                    this.router.navigate(["dash-board/admin/rutinas"]);
                })
        }
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
            this.unidadMedida = ''
        } else {
            this.onlyHalterofilia = true
            const tipoHalterofilia = this.tiposEjercicio.find(tEjercicio => tEjercicio.nombre_tipo.toLowerCase() === "halterofilia")
            if (tipoHalterofilia) this.tipoEjercicio = tipoHalterofilia.id.toString()
            this.ejerciciosRutina = []
            this.unidadMedida = 'Cantidad'
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
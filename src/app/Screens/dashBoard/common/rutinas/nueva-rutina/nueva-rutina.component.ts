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
    selector: 'nueva-rutina',
    templateUrl: './nueva-rutina.component.html',
    styleUrls: ['./nueva-rutina.component.css']
})

export class NuevaRutinaComponent {
    idInscripcion: number = 0;
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
        private form: FormBuilder,
        private ejercicioService: EjercicioService,
        private rutinaService: RutinaService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams.subscribe(params => {
            this.idInscripcion = params['id'];
            this.nombreCliente = params['nombreCliente'];
            this.pesoMaximo = params['pesoMaximo'];
        });
        this.formRutina = this.form.group({
            id_inscripcion: [this.idInscripcion, Validators.required],
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
            if (this.onlyHalterofilia)
                this.formEjercicio.patchValue({
                    id_tipo_ejercicio: this.tipoEjercicio
                })
            console.log(this.ejerciciosRutina)
        }
    }

    saveRutina() {
        this.formRutina.patchValue({
            ejercicios: this.ejerciciosRutina
        })
        if (this.formRutina.valid) {
            let rutinaNueva: rutinaGenerada = this.formRutina.value
            if (this.onlyHalterofilia) {
                let pesoRutina: number = Number(this.formRutina.get('peso')?.value);
                pesoRutina *= this.pesoMaximo / 100;
                rutinaNueva.peso = pesoRutina
            }
            this.showLoadingMessage(true);
            this.rutinaService.saveRutina(rutinaNueva).
                pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.showLoadingMessage(false);
                        if (error.status == 400)
                            this.showErrorMessage("Error en la petición");
                        else if (error.status == 500)
                            this.showErrorMessage("Error en el servidor");

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

    modificarEjercicio(ejercicio: ejercicioRutina) {
        this.formEjercicio.patchValue({
            id_tipo_ejercicio: ejercicio.id_tipo_ejercicio,
            id_ejercicio: ejercicio.id_ejercicio,
            cantidad_ejercicio: ejercicio.cantidad_ejercicio,
        })
        this.unidadMedida = ejercicio.unidad_medida
        this.eliminarEjercicioRutina(ejercicio)
    }

    eliminarEjercicioRutina(ejercicio: ejercicioRutina) {
        const index = this.ejerciciosRutina.findIndex(ejercicioModificado => ejercicioModificado.id_ejercicio === ejercicio.id_ejercicio);
        if (index !== -1) {
            this.ejerciciosRutina.splice(index, 1);
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
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { parse } from "date-fns";
import * as moment from "moment";
import { catchError } from "rxjs";
import { DetalleRutina, tipoEjercicio, ejercicioRutina, rutinaGenerada } from "src/app/Models";
import { EjercicioService } from "src/app/Services/ejercicio.service";
import { RutinaService } from "src/app/Services/rutina.service";
import Swal from "sweetalert2";

enum acciones {
    agregar,
    modificar,
    eliminar
}

@Component({
    selector: 'modificar-rutina',
    templateUrl: './modificar-rutina.component.html',
    styleUrls: ['./modificar-rutina.component.css']
})

export class ModificarRutinaComponent {
    isLoading: boolean = true
    rutina: DetalleRutina | undefined
    idRutina: number = 0
    idEjercicio: number = 0
    nombreCliente: string | undefined
    pesoMaximo: number | undefined 
    minDate: string = '';
    inputFecha: string = 'date';
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
    ejerciciosAlterados: ejercicioRutina[] = []
    accionRegistro: string = acciones[0]


    constructor(
        private form: FormBuilder,
        private ejercicioService: EjercicioService,
        private rutinaService: RutinaService,
        private router: Router,
        private activatedRute: ActivatedRoute,
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
        this.getRutina()
    }

    getRutina() {
        this.idRutina = Number(this.activatedRute.snapshot.paramMap.get('idRutina'));
        this.rutinaService.getRutina(this.idRutina).pipe()
        .subscribe((data: DetalleRutina) => {
            this.rutina = data;
            this.nombreCliente = this.rutina.nombre_cliente
            this.pesoMaximo = this.rutina.peso_maximo
            this.initializeDates()
            this.getTiposEjercicio()
        })
    }

    saveRutina() {
        this.formRutina.patchValue({
            ejercicios: this.ejerciciosRutina
        })
        if(this.formRutina.valid){
            if (this.formRutina.valid) {
                let rutinaNueva: rutinaGenerada = this.formRutina.value
                this.showLoadingMessage(true);
                this.rutinaService.updateRutina(rutinaNueva, this.idRutina).
                    pipe(
                        catchError((error: HttpErrorResponse) => {
                            this.showLoadingMessage(false);
                            if (error.status == 400)
                                this.showErrorMessage("Error en la petición");
                            else if (error.status == 500)
                                this.showErrorMessage("Error en el servidor");
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
    }

    modificarEjercicio(ejercicio: ejercicioRutina) {
        this.formEjercicio.patchValue({
            id_tipo_ejercicio: ejercicio.id_tipo_ejercicio,
            id_ejercicio: ejercicio.id_ejercicio,
            cantidad_ejercicio: ejercicio.cantidad_ejercicio,
        })
        this.tipoEjercicio = ejercicio.id_tipo_ejercicio.toString()
        this.unidadMedida = ejercicio.unidad_medida
        this.eliminarEjercicioRutina(ejercicio, 2)
        this.accionRegistro = acciones[1]
    }

    eliminarEjercicioRutina(ejercicio: ejercicioRutina, accion: number) {
        const index = this.ejerciciosRutina.findIndex(ejercicioModificado => ejercicioModificado.id_ejercicio === ejercicio.id_ejercicio);
        if (index !== -1)
            switch(accion){
                case 1:
                    this.ejerciciosRutina[index].accion = acciones[2];
                    break
                case 2:
                    this.idEjercicio = Number(this.ejerciciosRutina[index].id)
                    this.ejerciciosRutina.splice(index, 1);
                    break
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
            singleEjercicio.accion = this.accionRegistro
            if(this.accionRegistro == 'modificar') singleEjercicio.id = this.idEjercicio
            this.ejerciciosRutina.push(singleEjercicio)
            this.formEjercicio.reset()
            if (this.onlyHalterofilia)
                this.formEjercicio.patchValue({
                    id_tipo_ejercicio: this.tipoEjercicio
                })
            this.accionRegistro = acciones[0]
        }
    }


    setFormRutina() {
        if (this.rutina) {
            const ejercicios = this.rutina.detalle_rutina
            const fechaNormal:string = this.rutina.fecha_rutina.toString()
            const fechaConvertida = this.convertirFecha(fechaNormal)
            this.idRutina = this.rutina.id
            
            ejercicios?.forEach((ejercicio) => {
                const tipoEjercicio = this.tiposEjercicio.find((tEjercicio) => tEjercicio.id == ejercicio.detalle_ejercicio.id_tipo_ejercicio)
                const ejercicioRutina: ejercicioRutina = {
                    id: ejercicio.id,
                    id_tipo_ejercicio: ejercicio.detalle_ejercicio.id_tipo_ejercicio,
                    nombre_tEjercicio: tipoEjercicio?.nombre_tipo,
                    id_ejercicio: ejercicio.detalle_ejercicio.id,
                    nombre_ejercicio: ejercicio.detalle_ejercicio.nombre_ejercicio,
                    cantidad_ejercicio: ejercicio.cantidad_ejercicio,
                    id_unidad_medida: ejercicio.detalle_ejercicio.unidad_medida.id,
                    unidad_medida: ejercicio.detalle_ejercicio.unidad_medida.unidad_medida,
                    accion: "---"
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
        ejercicioSeleccionado ? this.unidadMedida = ejercicioSeleccionado.unidad_medida.unidad_medida : this.unidadMedida = 'Cantidad'
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
                setTimeout(() => { }, 100)
                this.isLoading = false
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
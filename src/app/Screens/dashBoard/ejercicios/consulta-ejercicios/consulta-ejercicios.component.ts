import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SafeResourceUrl } from '@angular/platform-browser'
import { getDetalleEjercicio, tipoEjercicio } from 'src/app/Models'
import { EjercicioService } from 'src/app/Services/ejercicio.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-ejercicios',
  templateUrl: './consulta-ejercicios.component.html',
  styleUrls: ['./consulta-ejercicios.component.css']
})
export class ConsultaEjerciciosComponent {
  formCrearEjercicio: FormGroup
  isLoading: boolean = true
  criterioEjercicio: string = ''
  criterioTipoEjercicio: string = ''
  tiposEjercicio: tipoEjercicio[] = []
  showVideo: boolean = false
  urlYoutubeGenerada: SafeResourceUrl  = ''
  detalleEjercicios: getDetalleEjercicio[] = []
  detalleEjercicio: getDetalleEjercicio | undefined

  constructor(
    private ejercicioService: EjercicioService,
    private form: FormBuilder
  ) {
    this.formCrearEjercicio = this.form.group({
      id_tipo_ejercicio: ['', Validators.required],
      nombre_ejercicio: ['', Validators.required],
      unidad_medida: ['', Validators.required],
      demo_ejercicio: ['', [Validators.required, Validators.pattern(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)]]
    })
  }

  ngOnInit() {
    this.getTiposEjercicio()
    this.getAllEjercicios()
  }

  getTiposEjercicio() {
    this.ejercicioService.getAllTiposEjercicio().
      pipe().
      subscribe((data: tipoEjercicio[]) => {
        this.tiposEjercicio = data
      })
  }

  getAllEjercicios() {
    this.isLoading = true
    this.ejercicioService.getAllEjercicios().
    pipe().
    subscribe((data: getDetalleEjercicio[]) => {
      this.detalleEjercicios = data
      setTimeout(() => { }, 100)
      this.isLoading = false
    })
  }

  setDetalleEjercicio(detalle: getDetalleEjercicio) {
    this.detalleEjercicio = detalle
  }

  limpiarForm() {
    this.formCrearEjercicio.reset()
    this.showVideo = false
    this.urlYoutubeGenerada = ''
    this.criterioEjercicio = ''
    this.criterioTipoEjercicio = ''
  }

  ocultarModal(idModal: string) {
    const modalElement = document.getElementById(idModal)
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')
    if (modalElement) {
      modalElement.classList.remove('show')
      modalElement.setAttribute('aria-hidden', 'true')
      modalElement.setAttribute('style', 'display: none')
    }
    if (modalBackdrop[0]) {
      document.body.removeChild(modalBackdrop[0])
    }
  }

  filterByParams(ejercicios: getDetalleEjercicio[] | undefined, nombre: string, tipo: string) {
    if ((tipo || nombre.length >=3) && ejercicios) {
      return ejercicios.filter(
        (ejercicio) => 
          ejercicio.nombre_ejercicio.toLowerCase().includes(nombre) &&
          ejercicio.id_tipo_ejercicio.toString().includes(tipo)
      )
    } else if(ejercicios) {
      return ejercicios
    } 
    return []
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

  showLoadingMessage(flag: boolean, title: string) {
    if (flag) {
      Swal.fire({
        title: title,
        didOpen: () => {
          Swal.disableButtons()
          Swal.showLoading()
        }
      })
    }
  }
}
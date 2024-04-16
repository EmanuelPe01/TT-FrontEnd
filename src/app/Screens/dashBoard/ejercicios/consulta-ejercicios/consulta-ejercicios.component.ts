import { HttpErrorResponse } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { catchError } from 'rxjs'
import { detalleEjercicio, getDetalleEjercicio, tipoEjercicio } from 'src/app/Models'
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
  nuevoTipoEjercicio: string = ''
  idTipoEjercicio: number | undefined
  confirmDeleteTipoEjercicio: boolean = false
  tiposEjercicio: tipoEjercicio[] = []
  showVideo: boolean = false
  urlYoutubeGenerada: SafeResourceUrl  = ''
  detalleEjercicios: getDetalleEjercicio[] = []

  constructor(
    private ejercicioService: EjercicioService,
    private form: FormBuilder,
    private sanitizer: DomSanitizer
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

  createTipoEjercicio() {
    if (this.nuevoTipoEjercicio) {
      this.ocultarModal('nuevoTipoEjercicio')
      this.showLoadingMessage(true, 'Guardando')
      const nombre_tipo = {
        'nombre_tipo': this.nuevoTipoEjercicio
      }
      this.ejercicioService.createTipoEjercicio(nombre_tipo).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '')
          switch (error.status) {
            case 400:
              this.showErrorMessage('Este nombre ya está registrado')
              break
            case 500:
              this.showErrorMessage("Error de conexión")
              break
            default:
              this.showErrorMessage("Error inesperado")
              console.log(error)
          }
          return ""
        })
      ).subscribe(
        (data: any) => {
          this.showLoadingMessage(false, '')
          this.nuevoTipoEjercicio = ''
          setTimeout(() => { }, 100)
          this.showMessageSucces(data.message)
          this.getTiposEjercicio()
        })
    }
  }

  editarTipoEjercicio() {
    if(this.idTipoEjercicio && this.nuevoTipoEjercicio){
      this.ocultarModal('editarTipoEjercicio')
      this.showLoadingMessage(true, 'Actualizando')
      const nombre_tipo = {
        'nombre_tipo': this.nuevoTipoEjercicio
      }
      this.ejercicioService.editTipoEjercicio(this.idTipoEjercicio, nombre_tipo).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '')
          switch (error.status) {
            case 400:
              this.showErrorMessage('Este nombre ya está registrado')
              break
            case 500:
              this.showErrorMessage("Error de conexión")
              break
            default:
              this.showErrorMessage("Error inesperado")
              console.log(error)
          }
          return ""
        })
      ).subscribe((data: any)=> {
        this.showLoadingMessage(false, '')
        this.idTipoEjercicio = undefined
        this.nuevoTipoEjercicio = ''
        setTimeout(() => { }, 100)
        this.showMessageSucces(data.message)
        this.getTiposEjercicio()
      })
    }
  }

  eliminarTipoEjercicio() {
    if(this.idTipoEjercicio && this.confirmDeleteTipoEjercicio){
      this.ocultarModal('eliminarTipoEjercicio')
      this.showLoadingMessage(true, 'Eliminando')
      this.ejercicioService.deleteTipoEjercicio(this.idTipoEjercicio).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoadingMessage(false, '')
          switch (error.status) {
            case 404:
              this.showErrorMessage('Registro no encontrado')
              break
            case 500:
              this.showErrorMessage("Error de conexión")
              break
            default:
              this.showErrorMessage("Error inesperado")
              console.log(error)
          }
          return ""
        })
      ).subscribe((data: any)=> {
        this.showLoadingMessage(false, '')
        this.idTipoEjercicio = undefined
        this.confirmDeleteTipoEjercicio = false
        setTimeout(() => { }, 100)
        this.showMessageSucces(data.message)
        this.getTiposEjercicio()
      })
    }
  }

  storeEjercicio() {
    if(this.formCrearEjercicio.valid) {
      this.ocultarModal('agregarEjercicio')
      this.showLoadingMessage(true, 'Guardando')
      const detalleEjercicio: detalleEjercicio = this.formCrearEjercicio.value
      detalleEjercicio.id_tipo_ejercicio = Number(this.formCrearEjercicio.get('id_tipo_ejercicio')?.value)
      this.ejercicioService.createEjercicio(detalleEjercicio).
      pipe().
      subscribe((data: any) => {
        this.showLoadingMessage(false, '')
        this.formCrearEjercicio.reset()
        setTimeout(() => { }, 100)
        this.showMessageSucces(data.message)
        this.isLoading = true
        this.getAllEjercicios()        
      })
    }
  }

  getAllEjercicios() {
    this.ejercicioService.getAllEjercicios().
    pipe().
    subscribe((data: getDetalleEjercicio[]) => {
      this.detalleEjercicios = data
      this.isLoading = false
    })
  }

  cargarVideo() {
    const urlYoutubeEntrada = this.formCrearEjercicio.get('demo_ejercicio')?.value
    const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:\?[^\s]*)?$/
    const matches = urlYoutubeEntrada.match(regExp)

    if (matches && matches[4]) {
      const videoId = matches[4]
      this.showVideo = true
      this.urlYoutubeGenerada = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId)
    } else {
      this.showVideo = false
    }
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
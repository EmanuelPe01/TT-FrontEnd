import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SafeResourceUrl } from '@angular/platform-browser'
import { getDetalleEjercicio, tipoEjercicio, UnidadMedida } from 'src/app/Models'
import { EjercicioService } from 'src/app/Services/ejercicio.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-ejercicios',
  templateUrl: './consulta-ejercicios.component.html',
  styleUrls: ['./consulta-ejercicios.component.css']
})
export class ConsultaEjerciciosComponent {
  isLoading: boolean = true
  criterioEjercicio: string = ''
  criterioTipoEjercicio: string = ''
  tiposEjercicio: tipoEjercicio[] = []
  unidadesMedida: UnidadMedida[] = []
  showVideo: boolean = false
  urlYoutubeGenerada: SafeResourceUrl  = ''
  detalleEjercicios: getDetalleEjercicio[] = []
  detalleEjercicio: getDetalleEjercicio | undefined

  constructor(
    private ejercicioService: EjercicioService,
  ) {  }

  ngOnInit() {
    this.getTiposEjercicio()
    this.getAllEjercicios()
    this.getUnidadesMedida()
  }

  getTiposEjercicio() {
    this.ejercicioService.getAllTiposEjercicio().
      pipe().
      subscribe((data: tipoEjercicio[]) => {
        this.tiposEjercicio = data
        this.criterioEjercicio = ''
      })
  }

  getUnidadesMedida() {
    this.ejercicioService.getUnidadesMedida().
        pipe().
        subscribe((data: UnidadMedida[]) => {
            this.unidadesMedida = data
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

  deleteEjercicio(nameEjercicio: string, id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se eliminará ${nameEjercicio}` ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6E1300",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoadingMessage(true, 'Eliminando');
        this.ejercicioService.deleteEjercicio(id).
        pipe().
        subscribe((data) => {
          this.showLoadingMessage(false, '');
          this.showMessageSucces('Registro eliminado');
          this.getAllEjercicios();
        })
      }
    });
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
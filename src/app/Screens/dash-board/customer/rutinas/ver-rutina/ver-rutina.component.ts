import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { DetalleRutina, ResultadoRutina } from 'src/app/Models';
import { RutinaService } from 'src/app/Services/rutina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-rutina',
  templateUrl: './ver-rutina.component.html',
  styleUrls: ['./ver-rutina.component.css'],
})
export class VerRutinaComponent {
  formResultados: FormGroup
  idRutina: number = 0
  rutina: DetalleRutina | undefined
  isLoading: boolean = true
  isCollapsed: boolean = false
  isExpanded = false
  tiempoMaximo: number = 0
  resultadoRutina: ResultadoRutina | undefined
  newResult: boolean = true

  constructor(
    private rutinaService: RutinaService,
    private activatedRute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _form: FormBuilder
  ) {
    this.formResultados = this._form.group({
      rondas: ['', Validators.required],
      minutos: ['', Validators.required],
      segundos: ['', Validators.required],
      comentarios: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getRutina()
  }

  guardarResultados() {
    if(this.newResult)
        this.nuevoResultado()
    else 
      this.actualizarResultado()
  }

  nuevoResultado() {
    if (this.formResultados.valid && this.rutina) {
      this.showLoadingMessage(true)
      const data = {
        id_rutina: this.rutina.id,
        rondas: this.formResultados.get('rondas')?.value,
        tiempo: `${this.formResultados.get('minutos')?.value}:${this.convertirASegundosFormato(this.formResultados.get('segundos')?.value)}`,
        comentarios: this.formResultados.get('comentarios')?.value
      }
      this.rutinaService.setResultados(data).pipe()
        .subscribe((data: any) => {
          this.showLoadingMessage(false)
          this.showMessageSucces(data.message)
          this.newResult = false
        })
    }
  }

  actualizarResultado() {
    if (this.formResultados.valid && this.rutina) {
      this.showLoadingMessage(true)
      const data = {
        id_rutina: this.rutina.id,
        rondas: this.formResultados.get('rondas')?.value,
        tiempo: `${this.formResultados.get('minutos')?.value}:${this.convertirASegundosFormato(this.formResultados.get('segundos')?.value)}`,
        comentarios: this.formResultados.get('comentarios')?.value
      }
      this.rutinaService.updateResultadoRutina(data, this.rutina.id).pipe()
        .subscribe((data: any) => {
          this.showLoadingMessage(false)
          this.showMessageSucces(data.message)
          this.newResult = false
        })
    }
  }

  getRutina() {
    this.idRutina = Number(this.activatedRute.snapshot.paramMap.get('idRutina'));
    this.rutinaService.getRutina(this.idRutina).pipe()
      .subscribe((data: DetalleRutina) => {
        this.rutina = data;
        this.tiempoMaximo = this.rutina.tiempo
        this.getResultadoRutina(this.rutina.id)
      })
  }

  getResultadoRutina(idRutina: number) {
    this.rutinaService.getResultadoRutina(idRutina).
      pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.isLoading = false
            this.resultadoRutina = undefined
          }
          else if (error.status == 500)
            this.showErrorMessage("Error en el servidor, intente más tarde");
          return ""
        })
      ).
      subscribe((data: ResultadoRutina | any) => {
        this.resultadoRutina = data;
        if (this.resultadoRutina) {
          const tiempo = this.obtenerMinutosYSegundos(this.resultadoRutina?.tiempo)
          this.newResult = false
          this.formResultados.setValue({
            rondas: this.resultadoRutina?.rondas,
            comentarios: this.resultadoRutina?.comentarios,
            minutos: tiempo.minutos,
            segundos: tiempo.segundos
          })
        }
        setTimeout(() => { }, 200)
        this.isLoading = false
      })
  }

  satinizarUrl(urlYoutube: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlYoutube);
  }

  obtenerMinutosYSegundos(timeString: string): { minutos: number, segundos: number } {
    const [minutosStr, segundosStr] = timeString.split(':');
    const minutos = parseInt(minutosStr, 10);
    const segundos = parseInt(segundosStr, 10);

    return {
      minutos,
      segundos
    };
  }

  convertirASegundosFormato(segundos: number): string {
    if (segundos < 0 || segundos >= 60) {
      throw new Error('El número de segundos debe estar en el rango de 0 a 59.');
    }
  
    return segundos < 10 ? `0${segundos}` : `${segundos}`;
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

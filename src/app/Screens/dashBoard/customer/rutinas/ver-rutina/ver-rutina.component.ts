import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DetalleRutina } from 'src/app/Models';
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

  guardarResultados () {
    if(this.formResultados.valid && this.rutina){
      this.showLoadingMessage(true)
      const data = {
        id_rutina: this.rutina.id,
        rondas: this.formResultados.get('rondas')?.value,
        tiempo: `${this.formResultados.get('minutos')?.value}:${this.formResultados.get('segundos')?.value}`,
        comentarios: this.formResultados.get('comentarios')?.value
      }      
      this.rutinaService.setResultados(data).pipe()
      .subscribe((data:any) => {
        this.showLoadingMessage(false)
        this.showMessageSucces(data.message)
      })
    }
  }

  getRutina() {
    this.idRutina = Number(this.activatedRute.snapshot.paramMap.get('idRutina'));
    this.rutinaService.getRutina(this.idRutina).pipe()
      .subscribe((data: DetalleRutina) => {
        this.rutina = data;
        this.isLoading = false
        this.tiempoMaximo = this.rutina.tiempo
      })
  }

  satinizarUrl(urlYoutube: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlYoutube);
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

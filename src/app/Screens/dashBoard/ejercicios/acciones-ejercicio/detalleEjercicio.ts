import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { getDetalleEjercicio } from "src/app/Models";

@Component({
    selector: 'detalleEjercicio',
    template: `
        <div class="modal fade" id="detalleEjercicio" tabindex="-1" aria-labelledby="detalleEjercicioLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="detalleEjercicioLabel">Detalle del ejercicio ejercicio</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-md-center text-center">
                            <div class="col col-3"> 
                                <p class="tituloDetalle">Tipo de ejercicio</p>
                                <p>{{detalleEjercicio?.tipo_ejercicio?.nombre_tipo}}</p>
                            </div>
                            <div class="col col-5"> 
                                <p class="tituloDetalle">Nombre del ejercicio</p>
                                <p>{{detalleEjercicio?.nombre_ejercicio}}</p>
                            </div>
                            <div class="col col-4"> 
                            <p class="tituloDetalle">Unidad de medida</p>
                                <p>{{detalleEjercicio?.unidad_medida}}</p>
                            </div>
                            <div class="col col-10">
                            <iframe class="YouTubeVideo"
                                        [src]="urlYoutubeGenerada"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerpolicy="strict-origin-when-cross-origin"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" style="
                        --bs-btn-font-size: 1rem;
                        --bs-btn-padding-y: .4rem; 
                        --bs-btn-padding-x: .6rem;
                        text-decoration: none;
                        --bs-btn-color: #fff;
                        --bs-btn-bg: #000;
                        --bs-btn-border-color: #fff;
                        --bs-btn-hover-color: #000;
                        --bs-btn-hover-bg: #fff;
                        --bs-btn-hover-border-color: #000;
                        --bs-btn-active-color: #000;
                        --bs-btn-active-bg: #fff;
                        --bs-btn-active-border-color: #000;
                    " data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class DetalleEjercicioComponent implements OnChanges {
    @Input() detalleEjercicio: getDetalleEjercicio | undefined
    urlYoutubeGenerada: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')

    constructor(
        private sanitizer: DomSanitizer
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["detalleEjercicio"] && changes["detalleEjercicio"].currentValue) {
          const videoUrl = changes["detalleEjercicio"].currentValue.demo_ejercicio;
          this.urlYoutubeGenerada = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        }
    }
}
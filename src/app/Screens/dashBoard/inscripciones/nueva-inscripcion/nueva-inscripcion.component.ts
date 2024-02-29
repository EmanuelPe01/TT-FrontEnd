import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nueva-inscripcion',
  templateUrl: './nueva-inscripcion.component.html',
  styleUrls: ['./nueva-inscripcion.component.css']
})
export class NuevaInscripcionComponent {

  formRegistro: FormGroup;

  constructor (
    private form: FormBuilder
  ) {
    this.formRegistro = this.form.group([
      
    ])
  }

  saveInscription() {

  }
}

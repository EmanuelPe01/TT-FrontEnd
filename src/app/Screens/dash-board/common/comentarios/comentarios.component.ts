import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacto, DetailInscription, InformacionUsuario, InscripcionesActivas, SingleComment } from 'src/app/Models';
import { ComentarioService } from 'src/app/Services/comentario.service';
import { IncripcionService } from 'src/app/Services/incripcion.service';
import { UserServiceService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef | undefined
  formComentario: FormGroup
  inscripcionesActivas: InscripcionesActivas[] = []
  id_inscripcion: number = 0
  id_cliente: number = 0
  id_entrenador: number = 0
  showParameters: boolean = false
  isLoading: boolean = true
  gettingMessages: boolean = false
  gettingContact: boolean = false
  changeFlag: boolean = true
  searchEnable: boolean = false
  contacto: InformacionUsuario | undefined
  comments: SingleComment[] = []
  rol: string = ''

  constructor(
    private inscripcionService: IncripcionService,
    private comentarioService: ComentarioService,
    private userService: UserServiceService,
    private _form: FormBuilder
  ) {
    this.getUserRole()
    this.formComentario = this._form.group({
      'comentarios': ['', Validators.required]
    })
  }

  ngAfterViewChecked() {
    if (this.messageContainer) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer!.nativeElement.scrollTop = this.messageContainer!.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al desplazar el scroll:', err);
    }
  }

  getUserRole() {
    this.userService.getUserRole().pipe().subscribe(
      (data: Contacto) => {
        this.rol = data.rol;
        if (this.rol.toLowerCase() == 'entrenador') {
          this.showParameters = true
          this.getActiveInscription()
        }
        else if(data.inscripcion){
          this.contacto = data.inscripcion.entrenador
          this.id_inscripcion = data.inscripcion.id
          this.searchEnable = true
          this.obtenerComentarios()
        }
      }
    )
  }

  getActiveInscription() {
    this.inscripcionService.getActiveInscription().
      pipe().
      subscribe((data: InscripcionesActivas[]) => {
        this.inscripcionesActivas = data
        this.isLoading = false
      })
  }

  activarBuscar(event: Event) {
    const inscripcionSeleccionada = event.target as HTMLSelectElement
    if (!isNaN(Number(inscripcionSeleccionada.value))) {
      const inscripcionInfo = this.inscripcionesActivas.find(insAct => insAct.id == Number(inscripcionSeleccionada.value))
      if(inscripcionInfo){
        this.id_inscripcion = inscripcionInfo.id
        this.id_cliente = inscripcionInfo.id_user_cliente
        this.searchEnable = true
        this.changeFlag = true
      }
    } else {
      this.searchEnable = false
    }
  }

  obtenerContacto() {
    if(this.id_cliente) {
      this.gettingContact = true
      this.userService.getUserById(this.id_cliente).pipe().subscribe(
        (data: InformacionUsuario) => {
          this.contacto = data
          this.gettingContact = false
        }
      )
    }
  }

  obtenerComentarios() {
    if (this.searchEnable) {
      if(this.changeFlag) this.gettingMessages=true
      this.comentarioService.getComments(this.id_inscripcion).pipe().subscribe(
        (data: SingleComment[]) => {
          this.comments = data
          this.isLoading = false
          this.gettingMessages = false
          this.changeFlag = false
        }
      )
    }
  }

  createPost() {
    if(this.formComentario.valid) {
      const post = {
        id_inscripcion: this.id_inscripcion,
        mensaje: this.formComentario.get('comentarios')?.value
      }
      this.formComentario.reset()
      this.comentarioService.createPost(post).pipe().subscribe(
        (data: any) => {
          this.obtenerComentarios()
        }
      )
    }
  }

  messageFrom(tipo: string): boolean {
    if (this.rol.toLowerCase() == tipo)
      return true

    return false
  }

  formatISODate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
  }
}

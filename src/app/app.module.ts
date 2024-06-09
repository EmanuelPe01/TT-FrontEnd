import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { NavBarComponent } from './Screens/dash-board/common/nav-bar/nav-bar.component';
import { ScreenControllerComponent } from './Screens/dash-board/common/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dash-board/admin/inscripciones/inscripciones.component';
import { NuevaInscripcionComponent } from './Screens/dash-board/admin/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { ConsultaInscripcionesComponent } from './Screens/dash-board/admin/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { EditarInscripcionComponent } from './Screens/dash-board/admin/inscripciones/editar-inscripcion/editar-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dash-board/admin/inscripciones/ver-inscripcion/ver-inscripcion.component';
import { EjerciciosComponent } from './Screens/dash-board/admin/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dash-board/admin/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { GestionTiposEjercicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-tipoEjercicio/gestionTiposEjercicios';
import { NuevoTipoEjercicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-tipoEjercicio/nuevoTipoEjercicio';
import { EditarTipoEjercicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-tipoEjercicio/editarTipoEjercicio';
import { NuevoEjercicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-ejercicio/nuevoEjercicio';
import { DetalleEjercicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-ejercicio/detalleEjercicio';
import { EditarEjericicioComponent } from './Screens/dash-board/admin/ejercicios/acciones-ejercicio/editarEjercicio';
import { NuevaUnidadMedidaComponent } from './Screens/dash-board/admin/ejercicios/acciones-unidadMedida/nuevaUnidadMedida';
import { EditarUnidadMedidaComponent } from './Screens/dash-board/admin/ejercicios/acciones-unidadMedida/editarUnidadMedida';
import { GestionUnidadMedidaComponent } from './Screens/dash-board/admin/ejercicios/acciones-unidadMedida/gestionUnidadMedida';
import { RutinasComponent } from './Screens/dash-board/common/rutinas/rutinas.component';
import { ConsultarRutinasComponent } from './Screens/dash-board/common/rutinas/consultar-rutina/consultar-rutina.component';
import { NuevaRutinaComponent } from './Screens/dash-board/common/rutinas/nueva-rutina/nueva-rutina.component';
import { ModificarRutinaComponent } from './Screens/dash-board/common/rutinas/modificar-rutina/modificar-rutina.component';
import { UsuariosComponent } from './Screens/dash-board/admin/usuarios/usuarios.component';
import { ConsultarUsuariosComponent } from './Screens/dash-board/admin/usuarios/consultar-usuarios/consultar-usuarios.component';
import { NuevoUsuarioComponent } from './Screens/dash-board/admin/usuarios/acciones-usuarios/nuevoUsuario';
import { VerUsuarioComponent } from './Screens/dash-board/admin/usuarios/acciones-usuarios/verUsuario';
import { EditarPerfilComponent } from './Screens/dash-board/common/editar-perfil/editar-perfil.component';
import { MostrarInfoPerfilComponent } from './Screens/dash-board/common/editar-perfil/mostrar-info-perfil/mostrar-info-perfil.component';
import { CambiarPasswordComponent } from './Screens/dash-board/common/editar-perfil/acciones-perfil/cambiar-pass.component';
import { CambiarInfoPerfilComponent } from './Screens/dash-board/common/editar-perfil/acciones-perfil/cambiar-info-perfil.component';
import { RutinasCustomerComponent } from './Screens/dash-board/customer/rutinas/rutinas-customer.component';
import { VerRutinaComponent } from './Screens/dash-board/customer/rutinas/ver-rutina/ver-rutina.component';
import { ConsultarRutinasCustomerComponent } from './Screens/dash-board/customer/rutinas/consultar-rutinas/consultar-rutinas.component';
import { ComentariosComponent } from './Screens/dash-board/common/comentarios/comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    NavBarComponent,
    ScreenControllerComponent,
    InscripcionesComponent,
    NuevaInscripcionComponent,
    ConsultaInscripcionesComponent,
    EditarInscripcionComponent,
    VerInscripcionComponent,
    EjerciciosComponent,
    ConsultaEjerciciosComponent,
    GestionTiposEjercicioComponent,
    NuevoTipoEjercicioComponent,
    EditarTipoEjercicioComponent,
    NuevoEjercicioComponent,
    DetalleEjercicioComponent,
    EditarEjericicioComponent,
    RutinasComponent,
    ConsultarRutinasComponent,
    NuevaRutinaComponent,
    ModificarRutinaComponent,
    NuevaUnidadMedidaComponent,
    EditarUnidadMedidaComponent,
    GestionUnidadMedidaComponent,
    UsuariosComponent,
    ConsultarUsuariosComponent,
    NuevoUsuarioComponent,
    VerUsuarioComponent,
    EditarPerfilComponent,
    MostrarInfoPerfilComponent,
    CambiarPasswordComponent,
    CambiarInfoPerfilComponent,
    RutinasCustomerComponent,
    VerRutinaComponent,
    ConsultarRutinasCustomerComponent,
    ComentariosComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

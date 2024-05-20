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
import { NavBarComponent } from './Screens/dashBoard/common/nav-bar/nav-bar.component';
import { ScreenControllerComponent } from './Screens/dashBoard/common/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dashBoard/admin/inscripciones/inscripciones.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/admin/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/admin/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { EditarInscripcionComponent } from './Screens/dashboard/admin/inscripciones/editar-inscripcion/editar-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dashboard/admin/inscripciones/ver-inscripcion/ver-inscripcion.component';
import { EjerciciosComponent } from './Screens/dashboard/admin/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dashboard/admin/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { GestionTiposEjercicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-tipoEjercicio/gestionTiposEjercicios';
import { NuevoTipoEjercicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-tipoEjercicio/nuevoTipoEjercicio';
import { EditarTipoEjercicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-tipoEjercicio/editarTipoEjercicio';
import { NuevoEjercicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-ejercicio/nuevoEjercicio';
import { DetalleEjercicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-ejercicio/detalleEjercicio';
import { EditarEjericicioComponent } from './Screens/dashboard/admin/ejercicios/acciones-ejercicio/editarEjercicio';
import { NuevaUnidadMedidaComponent } from './Screens/dashboard/admin/ejercicios/acciones-unidadMedida/nuevaUnidadMedida';
import { EditarUnidadMedidaComponent } from './Screens/dashboard/admin/ejercicios/acciones-unidadMedida/editarUnidadMedida';
import { GestionUnidadMedidaComponent } from './Screens/dashboard/admin/ejercicios/acciones-unidadMedida/gestionUnidadMedida';
import { RutinasComponent } from './Screens/dashBoard/common/rutinas/rutinas.component';
import { ConsultarRutinasComponent } from './Screens/dashBoard/common/rutinas/consultar-rutina/consultar-rutina.component';
import { NuevaRutinaComponent } from './Screens/dashBoard/common/rutinas/nueva-rutina/nueva-rutina.component';
import { ModificarRutinaComponent } from './Screens/dashBoard/common/rutinas/modificar-rutina/modificar-rutina.component';
import { UsuariosComponent } from './Screens/dashBoard/admin/usuarios/usuarios.component';
import { ConsultarUsuariosComponent } from './Screens/dashBoard/admin/usuarios/consultar-usuarios/consultar-usuarios.component';

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
    ConsultarUsuariosComponent
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

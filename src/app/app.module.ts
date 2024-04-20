import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { NavBarComponent } from './Screens/dashBoard/nav-bar/nav-bar.component';
import { ScreenControllerComponent } from './Screens/dashBoard/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dashBoard/inscripciones/inscripciones.component';
import { GestionWoodComponent } from './Screens/dashboard/wood/gestion-wood/gestion-wood.component';
import { ConsultarWoodComponent } from './Screens/dashboard/wood/consultar-wood/consultar-wood.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { EditarInscripcionComponent } from './Screens/dashboard/inscripciones/editar-inscripcion/editar-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dashboard/inscripciones/ver-inscripcion/ver-inscripcion.component';
import { EjerciciosComponent } from './Screens/dashboard/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dashboard/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { NuevoTipoEjercicioComponent } from './Screens/dashboard/ejercicios/acciones-tipoEjercicio/nuevoTipoEjercicio';
import { EditarTipoEjercicioComponent } from './Screens/dashboard/ejercicios/acciones-tipoEjercicio/editarTipoEjercicio';
import { EliminarTipoEjercicioComponent } from './Screens/dashboard/ejercicios/acciones-tipoEjercicio/eliminarTipoEjercicio';
import { NuevoEjercicioComponent } from './Screens/dashboard/ejercicios/acciones-ejercicio/nuevoEjercicio';
import { DetalleEjercicioComponent } from './Screens/dashboard/ejercicios/acciones-ejercicio/detalleEjercicio';
import { EditarEjericicioComponent } from './Screens/dashboard/ejercicios/acciones-ejercicio/editarEjercicio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    NavBarComponent,
    ScreenControllerComponent,
    InscripcionesComponent,
    GestionWoodComponent,
    ConsultarWoodComponent,
    NuevaInscripcionComponent,
    ConsultaInscripcionesComponent,
    EditarInscripcionComponent,
    VerInscripcionComponent,
    EjerciciosComponent,
    ConsultaEjerciciosComponent,
    NuevoTipoEjercicioComponent,
    EditarTipoEjercicioComponent,
    EliminarTipoEjercicioComponent,
    NuevoEjercicioComponent,
    DetalleEjercicioComponent,
    EditarEjericicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

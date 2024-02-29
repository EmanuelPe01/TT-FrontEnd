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
import { NgArrayPipesModule } from 'ngx-pipes';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { NavBarComponent } from './Screens/dashBoard/nav-bar/nav-bar.component';
import { ScreenControllerComponent } from './Screens/dashBoard/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dashBoard/inscripciones/inscripciones.component';
import { GestionWoodComponent } from './Screens/dashboard/wood/gestion-wood/gestion-wood.component';
import { ConsultarWoodComponent } from './Screens/dashboard/wood/consultar-wood/consultar-wood.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/inscripciones/consulta-inscripciones/consulta-inscripciones.component';

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
    ConsultaInscripcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgArrayPipesModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

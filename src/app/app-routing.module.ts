import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { ScreenControllerComponent } from './Screens/dashBoard/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dashBoard/inscripciones/inscripciones.component';
import { GestionWoodComponent } from './Screens/dashboard/wood/gestion-wood/gestion-wood.component';
import { ConsultarWoodComponent } from './Screens/dashboard/wood/consultar-wood/consultar-wood.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/inscripciones/consulta-inscripciones/consulta-inscripciones.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password/:token', component: RecoveryPasswordComponent},
  { 
    path: 'dash-board',
    component: ScreenControllerComponent,
    children: [
      {
        path: 'admin', children: [
          {path: '', component: GestionWoodComponent},
          {
            path: 'inscripciones', component: InscripcionesComponent, children: [
              {path: '', component: ConsultaInscripcionesComponent},
              {path: 'nuevaInscripcion', component: NuevaInscripcionComponent}
            ]
          }
        ]
      },
      {
        path: 'user', children: [
          {path: '', component: ConsultarWoodComponent}
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

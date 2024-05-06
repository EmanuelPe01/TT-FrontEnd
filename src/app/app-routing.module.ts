import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { ScreenControllerComponent } from './Screens/dashBoard/screen-controller/screen-controller.component';

//Inscripciones
import { InscripcionesComponent } from './Screens/dashBoard/inscripciones/inscripciones.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dashboard/inscripciones/ver-inscripcion/ver-inscripcion.component';

//Woods
import { WoodComponent } from './Screens/dashboard/wood/woods.component';
import { ConsultarWoodComponent } from './Screens/dashboard/wood/consultar-wood/consultar-wood.component';
import { EditarInscripcionComponent } from './Screens/dashboard/inscripciones/editar-inscripcion/editar-inscripcion.component';

//Ejercicios
import { EjerciciosComponent } from './Screens/dashboard/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dashboard/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { NuevoWoodComponent } from './Screens/dashBoard/wood/nuevo-wood/nuevo-wood.component';


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
          {
            path: 'rutinas', component: WoodComponent, children: [
              {path: '', component: ConsultarWoodComponent},
              {path: 'nuevaRutina/inscripcion', component: NuevoWoodComponent}
          ]
          },
          {
            path: 'inscripciones', component: InscripcionesComponent, children: [
              {path: '', component: ConsultaInscripcionesComponent},
              {path: 'nuevaInscripcion', component: NuevaInscripcionComponent},
              {path: 'edit/:idInscripcion', component: EditarInscripcionComponent},
              {path: 'detail/:idInscripcion', component: VerInscripcionComponent},
            ]
          },
          {
            path: 'ejercicios', component: EjerciciosComponent, children: [
              {path: '', component: ConsultaEjerciciosComponent}
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { ScreenControllerComponent } from './Screens/dashBoard/common/screen-controller/screen-controller.component';

//Inscripciones
import { InscripcionesComponent } from './Screens/dashBoard/admin/inscripciones/inscripciones.component';
import { ConsultaInscripcionesComponent } from './Screens/dashboard/admin/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { NuevaInscripcionComponent } from './Screens/dashBoard/admin/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dashboard/admin/inscripciones/ver-inscripcion/ver-inscripcion.component';
import { EditarInscripcionComponent } from './Screens/dashboard/admin/inscripciones/editar-inscripcion/editar-inscripcion.component';

//Woods
import { RutinasComponent } from './Screens/dashBoard/common/rutinas/rutinas.component';
import { ConsultarRutinasComponent } from './Screens/dashBoard/common/rutinas/consultar-rutina/consultar-rutina.component';
import { NuevaRutinaComponent } from './Screens/dashBoard/common/rutinas/nueva-rutina/nueva-rutina.component';

//Ejercicios
import { EjerciciosComponent } from './Screens/dashboard/admin/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dashboard/admin/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { ModificarRutinaComponent } from './Screens/dashBoard/common/rutinas/modificar-rutina/modificar-rutina.component';
import { UsuariosComponent } from './Screens/dashBoard/admin/usuarios/usuarios.component';
import { ConsultarUsuariosComponent } from './Screens/dashBoard/admin/usuarios/consultar-usuarios/consultar-usuarios.component';
import { EditarPerfilComponent } from './Screens/dashBoard/common/editar-perfil/editar-perfil.component';
import { MostrarInfoPerfilComponent } from './Screens/dashBoard/common/editar-perfil/mostrar-info-perfil/mostrar-info-perfil.component';
import { ConsultarRutinasCustomerComponent } from './Screens/dashBoard/customer/rutinas/consultar-rutinas/consultar-rutinas.component';
import { VerRutinaComponent } from './Screens/dashBoard/customer/rutinas/ver-rutina/ver-rutina.component';
import { RutinasCustomerComponent } from './Screens/dashBoard/customer/rutinas/rutinas-customer.component';


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
            path: 'rutinas', component: RutinasComponent, children: [
              {path: '', component: ConsultarRutinasComponent},
              {path: 'nuevaRutina', component: NuevaRutinaComponent},
              {path: 'modificarRutina/:idRutina', component: ModificarRutinaComponent},
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
          },
          {
            path: 'usuarios', component: UsuariosComponent, children: [
              {path: '', component: ConsultarUsuariosComponent}
            ]
          },
          {
            path: 'perfil', component: EditarPerfilComponent, children: [
              {path:'', component: MostrarInfoPerfilComponent}
            ]
          }
        ]
      },
      {
        path: 'trainer', children: [
          {
            path: 'rutinas', component: RutinasComponent, children: [
              {path: '', component: ConsultarRutinasComponent},
              {path: 'nuevaRutina', component: NuevaRutinaComponent},
              {path: 'modificarRutina', component: ModificarRutinaComponent},
          ]
          },
          {
            path: 'ejercicios', component: EjerciciosComponent, children: [
              {path: '', component: ConsultaEjerciciosComponent}
            ]
          },
          {
            path: 'perfil', component: EditarPerfilComponent, children: [
              {path:'', component: MostrarInfoPerfilComponent}
            ]
          }
        ]
      },
      {
        path: 'customer', children: [
          {
            path: 'rutinas', component: RutinasCustomerComponent, children: [
              { path: '', component: ConsultarRutinasCustomerComponent},
              { path: 'detailRoutine/:idRutina', component: VerRutinaComponent}
            ]
          },
          {
            path: 'perfil', component: EditarPerfilComponent, children: [
              {path:'', component: MostrarInfoPerfilComponent}
            ]
          }
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

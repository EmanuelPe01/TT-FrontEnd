import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { ScreenControllerComponent } from './Screens/dash-board/common/screen-controller/screen-controller.component';
import { InscripcionesComponent } from './Screens/dash-board/admin/inscripciones/inscripciones.component';
import { ConsultaInscripcionesComponent } from './Screens/dash-board/admin/inscripciones/consulta-inscripciones/consulta-inscripciones.component';
import { NuevaInscripcionComponent } from './Screens/dash-board/admin/inscripciones/nueva-inscripcion/nueva-inscripcion.component';
import { VerInscripcionComponent } from './Screens/dash-board/admin/inscripciones/ver-inscripcion/ver-inscripcion.component';
import { EditarInscripcionComponent } from './Screens/dash-board/admin/inscripciones/editar-inscripcion/editar-inscripcion.component';
import { RutinasComponent } from './Screens/dash-board/common/rutinas/rutinas.component';
import { ConsultarRutinasComponent } from './Screens/dash-board/common/rutinas/consultar-rutina/consultar-rutina.component';
import { NuevaRutinaComponent } from './Screens/dash-board/common/rutinas/nueva-rutina/nueva-rutina.component';
import { EjerciciosComponent } from './Screens/dash-board/admin/ejercicios/ejercicios.component';
import { ConsultaEjerciciosComponent } from './Screens/dash-board/admin/ejercicios/consulta-ejercicios/consulta-ejercicios.component';
import { ModificarRutinaComponent } from './Screens/dash-board/common/rutinas/modificar-rutina/modificar-rutina.component';
import { UsuariosComponent } from './Screens/dash-board/admin/usuarios/usuarios.component';
import { ConsultarUsuariosComponent } from './Screens/dash-board/admin/usuarios/consultar-usuarios/consultar-usuarios.component';
import { EditarPerfilComponent } from './Screens/dash-board/common/editar-perfil/editar-perfil.component';
import { MostrarInfoPerfilComponent } from './Screens/dash-board/common/editar-perfil/mostrar-info-perfil/mostrar-info-perfil.component';
import { ConsultarRutinasCustomerComponent } from './Screens/dash-board/customer/rutinas/consultar-rutinas/consultar-rutinas.component';
import { VerRutinaComponent } from './Screens/dash-board/customer/rutinas/ver-rutina/ver-rutina.component';
import { RutinasCustomerComponent } from './Screens/dash-board/customer/rutinas/rutinas-customer.component';
import { ComentariosComponent } from './Screens/dash-board/common/comentarios/comentarios.component';


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
              {path: 'modificarRutina/:idRutina', component: ModificarRutinaComponent},
          ]
          },
          {
            path: 'ejercicios', component: EjerciciosComponent, children: [
              {path: '', component: ConsultaEjerciciosComponent}
            ]
          },
          { path: 'comentarios', component: ComentariosComponent } ,
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
          { path: 'comentarios', component: ComentariosComponent } ,
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

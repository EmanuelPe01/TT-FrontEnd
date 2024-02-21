import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { NavBarComponent } from './Screens/dashBoard/nav-bar/nav-bar.component';
import { ScreenControllerComponent } from './Screens/dashBoard/screen-controller/screen-controller.component';
import { RutinasComponent } from './Screens/dashBoard/rutinas/rutinas.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password/:token', component: RecoveryPasswordComponent},
  { 
    path: 'dash-board',
    component: ScreenControllerComponent,
    children: [
      {path: '', component: RutinasComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

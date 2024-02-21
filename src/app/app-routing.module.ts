import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { RecoveryPasswordComponent } from './Screens/recovery-password/recovery-password.component';
import { NavBarComponent } from './Screens/dashBoard/nav-bar/nav-bar.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password/:token', component: RecoveryPasswordComponent},
  { 
    path: 'dash-board',
    component: NavBarComponent,
    children: [

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

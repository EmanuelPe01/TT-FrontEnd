import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { MainScreenComponent } from './Screens/main-screen/main-screen.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { 
    path: 'dashboard',
    component: MainScreenComponent,
    children: [

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

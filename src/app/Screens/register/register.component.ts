import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = "";
  firstSurname: string = "";
  secondSurname: string = "";
  email: string = "";
  telephone: string = "";
  password: string = "";
  confirm_parr: string = "";

}

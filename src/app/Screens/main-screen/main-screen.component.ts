import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {


  constructor (
    private user_service: UserServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    if(!this.user_service.isAuthenticated()) 
      this.route.navigate(['/']);
  }

  logOut() {
    this.user_service.logout().subscribe(
      (data) => {
        this.user_service.deleteToken();
        this.route.navigate(['/']);
      }, 
      (error) => {
        this.showErrorMessage();
        console.log(error)
      }
    )
  }

  showErrorMessage(){
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
    })
  }
}

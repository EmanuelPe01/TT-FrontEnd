import { Component } from "@angular/core";
import { InfoLogin } from "src/app/Models";
import { UserServiceService } from "src/app/Services/user.service";
import * as moment from 'moment';

@Component({
    selector: 'mostrar-info-perfil-app',
    templateUrl: './mostrar-info-perfil.component.html',
    styleUrls: ['./mostrar-info-perfil.component.css']
})

export class MostrarInfoPerfilComponent {
    userInformation: InfoLogin | undefined;
    edad: number = 0
    isLoading: boolean = true

    constructor(
        private userService: UserServiceService,
    ) { }

    ngOnInit() {
        this.getUser()
    }

    getUser() {
        this.userService.isAuthenticated().pipe()
            .subscribe((data: InfoLogin) => {
                this.userInformation = data;
                if (this.userInformation.user.fecha_nacimiento)
                    this.edad = this.calculateAge(this.userInformation.user.fecha_nacimiento)
                this.isLoading = false
            })
    }

    calculateAge(birthDate: string): number {
        return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
    }
}
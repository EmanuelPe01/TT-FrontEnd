import { Rol } from "./ModelRol"

export interface registrarUsuario{
    id_rol:           number
    name:             string,
    firstSurname:     string,
    secondSurname:    string,
    telephone:        string,
    email:            string,
    password:         string,
    fecha_nacimiento: Date
}

export interface loginUsuario{
    email:          string,
    password:       string
}

export interface informacionUsuario {
    id:             number,
    name:           string,
    firstSurname:   string,
    secondSurname:  string,
    telephone:      string,
    email:          string,
    rol:            Rol
}

export interface infoBasicaUsuario {
    id:             number,
    name:           string,
    firstSurname:   string,
    secondSurname:  string,
}

export interface infoLogin {
    token:      string,
    user:    informacionUsuario
}
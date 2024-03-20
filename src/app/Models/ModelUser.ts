import { Rol } from "./ModelRol"

export interface RegistrarUsuario{
    id_rol:           number
    name:             string,
    firstSurname:     string,
    secondSurname:    string,
    telephone:        string,
    email:            string,
    password:         string,
    fecha_nacimiento: Date
}

export interface LoginUsuario{
    email:          string,
    password:       string
}

export interface InformacionUsuario {
    id:             number,
    name:           string,
    firstSurname:   string,
    secondSurname:  string,
    telephone:      string,
    email:          string,
    rol:            Rol
}

export interface InfoBasicaUsuario {
    id:             number,
    name:           string,
    firstSurname:   string,
    secondSurname:  string,
}

export interface InfoLogin {
    token:      string,
    user:    InformacionUsuario
}
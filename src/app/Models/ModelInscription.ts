import { Rol } from "./ModelRol";
import { infoBasicaUsuario } from "./ModelUser";

export interface detailInscription {
    detalle:    inscriptionInformation
    rol:        Rol
}

export interface inscriptionInformation {
    id:                 number,
    id_user_cliente:    number,
    id_user_entrenador: number,
    fecha_inicio:       Date,
    peso_maximo:        number,
    estado:             number
}

export interface singleInscription {
    id:                 number,
    id_user_cliente:    number,
    id_user_entrenador: number,
    fecha_inicio:       Date,
    peso_maximo:        number,
    estado:             string,
    cliente:            infoBasicaUsuario,
    entrenador:         infoBasicaUsuario
}

export interface generateInscription {
    id_user_cliente:    number,
    id_user_entrenador: number,
    fecha_inicio:       Date,
    peso_maximo:        number,
    estado:             string, 
}

export interface inscripciones {
    inscripciones: singleInscription[]
}
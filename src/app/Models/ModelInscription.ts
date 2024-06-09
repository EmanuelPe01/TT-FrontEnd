import { Rol } from './ModelRol';
import { InfoBasicaUsuario, InformacionUsuario } from './ModelUser';

export interface DetailInscription {
    detalle: InscriptionInformation
    rol: Rol
}

export interface InscriptionInformation {
    id: number
    id_user_cliente: number
    id_user_entrenador: number
    fecha_inicio: Date
    peso_maximo: number
    estado: number
}

export interface SingleInscription {
    id: number
    id_user_cliente: number
    id_user_entrenador: number
    fecha_inicio: Date
    peso_maximo: number
    estado: string
    cliente: InfoBasicaUsuario
    entrenador: InfoBasicaUsuario
}

export interface GenerateInscription {
    id_user_cliente: number
    id_user_entrenador: number
    fecha_inicio: Date
    peso_maximo: number
    estado: string
}

export interface InscripcionesActivas {
    id:               number
    id_user_cliente:  number
    estado:           number
    peso_maximo:      number
    cliente:          InfoBasicaUsuario
}
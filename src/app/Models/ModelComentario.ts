import { Rol } from "./ModelRol"

export interface SingleComment {
    mensaje:        string
    tipo_usuario:   string
    created_at:     string
}

export interface Contacto {
    rol: string
    inscripcion?: {
        id: number
        id_user_entrenador: number
        entrenador: {
            id: number
            name: string
            firstSurname: string
            secondSurname: string
            telephone: string
            email: string
            rol: Rol
        }
    }
}
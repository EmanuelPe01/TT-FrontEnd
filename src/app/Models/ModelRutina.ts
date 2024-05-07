import { ejercicioRutina } from "./ModelEjercicio";

export interface rutinaGenerada {
    id_inscripcion:     number
    fecha_rutina:       Date
    rondas:             number
    tiempo:             number
    peso:               number
    halterofilia:       boolean
    ejercicios:         ejercicioRutina[]
}

export interface DetalleRutina {
    id:             number
    id_inscripcion:     number
    fecha_rutina:       Date
    rondas:             number
    tiempo:             number
    peso:               number
    halterofilia:       boolean
    detalle_rutina: [
        {
            id:                     number
            id_ejercicio:           number
            cantidad_ejercicio:     number
            detalle_ejercicio: {
                id:                     number
                id_tipo_ejercicio:      number
                nombre_ejercicio:       string
                demo_ejercicio:         string
                unidad_medida:          string
            }
        }
    ]
}


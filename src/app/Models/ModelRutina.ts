import { ejercicioRutina } from "./ModelEjercicio";

export interface rutinaGenerada {
    id_inscripcion:     number
    fecha_rutina:       Date
    rondas:             number
    tiempo:             number
    peso:               number
    halterofilia:       boolean,
    ejercicios:         ejercicioRutina[]
}


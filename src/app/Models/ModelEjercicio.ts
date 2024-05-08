export interface tipoEjercicio {
    id:             number
    nombre_tipo:    string
}

export interface detalleEjercicio {
    id_tipo_ejercicio:  number
    nombre_ejercicio:   string
    unidad_medida:      string
    demo_ejercicio:     string
}

export interface getDetalleEjercicio {
    id:                 number
    id_tipo_ejercicio:  number
    nombre_ejercicio:   string
    unidad_medida:      string
    demo_ejercicio:     string
    tipo_ejercicio: {
        id:                 number
        nombre_tipo:        string
    }
}

export interface ejercicioRutina {
    id?:                number
    id_tipo_ejercicio:  number
    nombre_tEjercicio?:  string
    id_ejercicio:       number
    nombre_ejercicio:   string
    cantidad_ejercicio: number
    unidad_medida:      string
    accion?:            string
}
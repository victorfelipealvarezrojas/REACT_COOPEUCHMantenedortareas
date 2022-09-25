import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_ERROR,
    AGREGAR_TAREA_OK,
    CARGA_TAREA,
    CARGA_TAREA_ERROR,
    CARGA_TAREA_OK,
    TAREA_ELIMINAR,
    TAREA_ELIMINAR_OK,
    TAREA_ELIMINAR_ERROR,
    TAREA_EDITAR,
    TAREA_EDITAR_OK,
    TAREA_EDITAR_ERROR
} from '../types';


const initialState = {
    tareas: [],
    error: false,
    loading: false,
    tarea_eliminar: null,
    tareaeditar: null,
}

export default function (state = initialState, action: any) {
    switch (action.type) {

        case AGREGAR_TAREA:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_TAREA_OK:
            return {
                ...state,
                loading: false,
                tareas: [...state.tareas, action.payload]
            }
        case AGREGAR_TAREA_ERROR:
        case TAREA_ELIMINAR_ERROR:
        case CARGA_TAREA_ERROR:
        case TAREA_EDITAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CARGA_TAREA:
            return {
                ...state,
                loading: action.payload
            }
        case CARGA_TAREA_OK:
            return {
                ...state,
                loading: false,
                error: false,
                tareas: action.payload
            }
        case TAREA_ELIMINAR:
            return {
                ...state,
                tarea_eliminar: action.payload //ref
            }
        case TAREA_ELIMINAR_OK:
            return {
                ...state,
                tareas: state.tareas.filter((tarea: any) => tarea.id !== state.tarea_eliminar),
                tarea_eliminar: null
            }
        case TAREA_EDITAR:
            return {
                ...state,
                tareaeditar: action.payload
            }
        case TAREA_EDITAR_OK: {
            return {
                ...state,
                tareaeditar: null,
                tareas: state.tareas.map((tarea: any) => (
                    tarea.id === action.payload.id ? tarea = action.payload : tarea
                ))
            }
        }
        default:
            return state;
    }
}
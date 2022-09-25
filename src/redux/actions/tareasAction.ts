import clienteAxios from '../../config/axios';
import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_ERROR,
    AGREGAR_TAREA_OK,
    CARGA_TAREA,
    CARGA_TAREA_ERROR,
    CARGA_TAREA_OK,
    TAREA_ELIMINAR,
    TAREA_ELIMINAR_ERROR,
    TAREA_ELIMINAR_OK,
    TAREA_EDITAR,
    INICIO_TAREA_EDICION,
    TAREA_EDITAR_OK
} from '../types';
import Swal from 'sweetalert2';


/**
 * @param tarea 
 * @returns Crea nuevas tareas
 */
export function nuevaTarea(tarea: any) {
    return async (dispatch: any) => {
        dispatch(agregarTarea())
        try {
            await clienteAxios.post('/tareas', tarea)
            dispatch(agregarTareaExito(tarea))
            Swal.fire(
                'Correcto',
                'Tarea creada de froma correcta.',
                'success'
            )
        } catch (error) {
            dispatch(agregarTareaError(true));
            Swal.fire({
                icon: 'error',
                title: 'Error interno',
                text: 'vuelve a intentarlo mas tarde'
            })
        }
    }
}

const agregarTarea = () => ({
    type: AGREGAR_TAREA,
    payload: true
})

const agregarTareaExito = (tarea: any) => ({
    type: AGREGAR_TAREA_OK,
    payload: tarea
})

const agregarTareaError = (estado: boolean) => ({
    type: AGREGAR_TAREA_ERROR,
    payload: estado
})

/**
 * @action Obtiene todas las tareas dede la API
 */
export function obtenerTareas() {
    return async (dispatch: any) => {
        dispatch(listarTareas())
        try {
            const response = await clienteAxios.get('/tareas')
            dispatch(descargaTareas(response.data))
        } catch (error) {
            dispatch(descargaError())
        }
    }
}

const descargaTareas = (tareas: any) => ({
    type: CARGA_TAREA_OK,
    payload: tareas
})

const listarTareas = () => ({
    type: CARGA_TAREA,
    payload: true
})

const descargaError = () => ({
    type: CARGA_TAREA_ERROR,
    payload: true
})

/**
 * @param id 
 * @action Elimina tareas por Id
 */
export function eliminarTarea(id: number) {
    return async (dispatch: any) => {
        dispatch(obtenerTareaEliminar(id))

        Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
        )

        try {
            const result = await clienteAxios.delete(`/tareas/${id}`)
            dispatch(eliminarTareaExito())
        } catch (error) {
            dispatch(eliminarTareaError())
        }
    }
}

const obtenerTareaEliminar = (id: number) => ({
    type: TAREA_ELIMINAR,
    payload: id
})

const eliminarTareaExito = () => ({
    type: TAREA_ELIMINAR_OK
})

const eliminarTareaError = () => ({
    type: TAREA_ELIMINAR_ERROR,
    payload: true
})


/**
 * @param tarea 
 * @returns retorna el producto a editar
 */
export function ObtenerTareaEditar(tarea: any) {
    return async (dispatch: any) => {
        dispatch(obtenerTarea(tarea))
    }
}

const obtenerTarea = (tarea: any) => ({
    type: TAREA_EDITAR,
    payload: tarea
})

/**
 * @param tarea 
 * @returns retorna el producto a editar 
 */
export function editaTarea(tarea: any) {
    return async (dispatch: any) => {
        dispatch(editarTarea())
        try {
            await clienteAxios.put(`/tareas/${tarea.id}`, tarea)
            dispatch(editarTareaExito(tarea))
        } catch (error) {

        }
    }
}

const editarTarea = () => ({
    type: INICIO_TAREA_EDICION
})

const editarTareaExito = (tarea: any) => ({
    type: TAREA_EDITAR_OK,
    payload: tarea
})
